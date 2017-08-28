import * as GoogleMapsAdapter from './GoogleMapsAdapter'
import googleMock from './__mocks__/google'

window.google = googleMock

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
      expect(window.google.maps.Map).toBeCalledWith(mapContainer, { zoom: 10 })
    })

    it('creates autocomplete', () => {
      expect(window.google.maps.places.Autocomplete).toBeCalledWith(input, { types: ['geocode'] })
    })

    it('creates marker in correct position and map', () => {
      const map = window.google.maps.Map.mock.instances[0]
      const position = { lat: 11, lng: 11 }

      expect(window.google.maps.Marker).toBeCalledWith({ position, map })
    })

    it('centralizes the map by marker', () => {
      const map = window.google.maps.Map.mock.instances[0]
      const marker = window.google.maps.Marker.mock.instances[0]

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
      window.google.maps.event.trigger('click', {
        latLng: { lat: 4, lng: 4 }
      })
    })

    it('changes marker position', () => {
      const marker = window.google.maps.Marker.mock.instances[0]

      expect(marker.setPosition).toBeCalledWith({ lat: 4, lng: 4 })
    })

    it('inputs receive address', () => {
      expect(input.value).toEqual('Belo Horizonte - MG')
    })

    it('calls onChange with new position value', () => {
      expect(onChangeSpy).toBeCalledWith({ lat: 4, lng: 4 })
    })
  })

  describe('when search place', () => {
    beforeEach(() => {
      window.google.maps.event.trigger('place_changed', {
        autocomplete: window.google.maps.places.Autocomplete.mock.instances[0],
        map: window.google.maps.Map.mock.instances[0],
        marker: window.google.maps.Marker.mock.instances[0]
      })
    })

    it('changes marker position', () => {
      const marker = window.google.maps.Marker.mock.instances[0]

      expect(marker.setPosition).toBeCalledWith({ lat: 5, lng: 5 })
    })

    it('centralizes the map', () => {
      expect(window.google.maps.Map.mock.instances[0].setCenter).toBeCalledWith(
        window.google.maps.Marker.mock.instances[0].position
      )
    })

    it('calls onChange with new position value', () => {
      expect(onChangeSpy).toBeCalledWith({ lat: 5, lng: 5 })
    })
  })
})
