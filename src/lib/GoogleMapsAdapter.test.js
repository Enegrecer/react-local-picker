import * as GoogleMapsAdapter from './GoogleMapsAdapter'
import googleMapsAPIMock from './__mocks__/googleMapsAPIMock'

window.google = googleMapsAPIMock

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

  beforeAll(() => {
    window.google = googleMapsAPIMock
  })

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
      expect(googleMapsAPIMock.maps.Map).toBeCalledWith(mapContainer, { zoom: 10 })
    })

    it('creates autocomplete', () => {
      expect(googleMapsAPIMock.maps.places.Autocomplete).toBeCalledWith(input, { types: ['geocode'] })
    })

    it('creates marker in correct position and map', () => {
      const map = googleMapsAPIMock.maps.Map.mock.instances[0]
      const position = { lat: 11, lng: 11 }

      expect(googleMapsAPIMock.maps.Marker).toBeCalledWith({ position, map })
    })

    it('centralizes the map by marker', () => {
      const map = googleMapsAPIMock.maps.Map.mock.instances[0]
      const marker = googleMapsAPIMock.maps.Marker.mock.instances[0]

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
      googleMapsAPIMock.maps.event.trigger('click', {
        latLng: { lat: 4, lng: 4 }
      })
    })

    it('changes marker position', () => {
      const marker = googleMapsAPIMock.maps.Marker.mock.instances[0]

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
      googleMapsAPIMock.maps.event.trigger('place_changed', {
        autocomplete: googleMapsAPIMock.maps.places.Autocomplete.mock.instances[0],
        map: googleMapsAPIMock.maps.Map.mock.instances[0],
        marker: googleMapsAPIMock.maps.Marker.mock.instances[0]
      })
    })

    it('changes marker position', () => {
      const marker = googleMapsAPIMock.maps.Marker.mock.instances[0]

      expect(marker.setPosition).toBeCalledWith({ lat: 5, lng: 5 })
    })

    it('centralizes the map', () => {
      expect(googleMapsAPIMock.maps.Map.mock.instances[0].setCenter).toBeCalledWith(
        googleMapsAPIMock.maps.Marker.mock.instances[0].position
      )
    })

    it('calls onChange with new position value', () => {
      expect(onChangeSpy).toBeCalledWith({ lat: 5, lng: 5 })
    })
  })
})
