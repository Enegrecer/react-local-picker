import * as GoogleMapsAdapter from './GoogleMapsAdapter'
import googleMock from './__mocks__/google'

window.google = googleMock

function clearAllMockFn() {
  window.google.maps.Map.mockClear()
  window.google.maps.Marker.mockClear()
  window.google.maps.Geocoder.mockClear()
  window.google.maps.places.Autocomplete.mockClear()
}

function getMapMockInstance() {
  return getMap().mock.instances[0]
}

function getMarkerMockInstance() {
  return getMarker().mock.instances[0]
}

function getAutocompleteMockInstance() {
  return getAutocomplete().mock.instances[0]
}

function getMap() {
  return window.google.maps.Map
}

function getAutocomplete() {
  return window.google.maps.places.Autocomplete
}

function getMarker() {
  return window.google.maps.Marker
}

function fireEventInsideMaps(eventName, value) {
  window.google.maps.event.trigger(eventName, value)
}

describe('GoogleMapsAdapter', () => {
  const onChangeSpy = jest.fn()
  const value = { lat: 11, lng: 11 }
  const input = { value: '' }
  const mapContainer = {}
  const adapterConfig = {
    map: {
      zoom: 10
    },
    text: {
      loadingText: 'Carregando'
    }
  }

  describe('when init', () => {
    it('works', () => {
      expect(GoogleMapsAdapter.init(
        value,
        mapContainer,
        input,
        onChangeSpy,
        adapterConfig
      ))
    })

    it('creates map', () => {
      const map = getMap()
      expect(map).toBeCalledWith(mapContainer, { zoom: 10 })
    })

    it('creates autocomplete', () => {
      const autocomplete = getAutocomplete()
      expect(autocomplete).toBeCalledWith(input, { types: ['address'] })
    })

    it('creates marker in correct position and map', () => {
      const map = getMapMockInstance()
      const marker = getMarker()
      const position = { lat: 11, lng: 11 }

      expect(marker).toBeCalledWith({ position, map })
    })

    it('centralizes the map by marker', () => {
      const map = getMapMockInstance()
      const marker = getMarkerMockInstance()

      expect(map.setCenter).toBeCalledWith(marker.position)
    })

    describe('input', () => {
      it('is clear', () => {
        expect(input.value).toEqual('')
      })
    })
  })

  describe('when map is clicked', () => {
    beforeEach(() => {
      clearAllMockFn()
      onChangeSpy.mockClear()
      GoogleMapsAdapter.init(
        value,
        mapContainer,
        input,
        onChangeSpy,
        adapterConfig
      )
      fireEventInsideMaps('click', {
        latLng: { lat: 4, lng: 4 }
      })
    })

    it('changes marker position', () => {
      const marker = getMarkerMockInstance()

      expect(marker.setPosition).toBeCalledWith({ lat: 4, lng: 4 })
    })

    it('inputs receive address', () => {
      expect(input.value).toEqual('Belo Horizonte - MG')
    })

    it('calls onChange with new position value', () => {
      const expectedPosition = {
        lat: 5,
        lng: 5,
        address: []
      }

      expect(onChangeSpy).toBeCalledWith(expectedPosition)
    })
  })

  describe('when search place', () => {
    beforeEach(() => {
      clearAllMockFn()
      onChangeSpy.mockClear()
      GoogleMapsAdapter.init(
        value,
        mapContainer,
        input,
        onChangeSpy,
        adapterConfig
      )
      fireEventInsideMaps('place_changed', null)
    })

    it('changes marker position', () => {
      const marker = getMarkerMockInstance()

      expect(marker.setPosition.mock.calls[0][0].lat()).toBe(5)
      expect(marker.setPosition.mock.calls[0][0].lng()).toBe(5)
    })

    it('centralizes the map', () => {
      const map = getMapMockInstance()
      const marker = getMarkerMockInstance()

      expect(map.setCenter).toBeCalledWith(marker.position)
    })

    it('calls onChange with new position value', () => {
      const expectedPosition = {
        lat: 5,
        lng: 5,
        address: []
      }

      expect(onChangeSpy).toBeCalledWith(expectedPosition)
    })
  })

  describe('when searching for a place does not return any results from google', () => {
    beforeEach(() => {
      clearAllMockFn()
      onChangeSpy.mockClear()
      GoogleMapsAdapter.init(
        value,
        mapContainer,
        input,
        onChangeSpy,
        adapterConfig
      )

      getAutocompleteMockInstance().getPlace = () => ({});

      fireEventInsideMaps('place_changed', null)
    })

    it('does not change the marker position', () => {
      const marker = getMarkerMockInstance()

      expect(marker.setPosition).not.toHaveBeenCalled()
    })

    it('does not centralize the map', () => {
      const map = getMapMockInstance()
      const marker = getMarkerMockInstance()

      expect(map.setCenter).toHaveBeenCalledTimes(1)
    })

    it('does not call onChange with new position value', () => {
      const expectedPosition = {
        lat: 5,
        lng: 5,
        address: []
      }

      expect(onChangeSpy).not.toHaveBeenCalled()
    })
  })
})
