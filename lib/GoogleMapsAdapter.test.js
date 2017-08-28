'use strict';

var _GoogleMapsAdapter = require('./GoogleMapsAdapter');

var GoogleMapsAdapter = _interopRequireWildcard(_GoogleMapsAdapter);

var _googleMapsAPIMock = require('./__mocks__/googleMapsAPIMock');

var _googleMapsAPIMock2 = _interopRequireDefault(_googleMapsAPIMock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

window.google = _googleMapsAPIMock2.default;

describe('GoogleMapsAdapter', function () {
  var onChangeSpy = jest.fn();
  var value = { lat: 11, lng: 11 };
  var input = { value: '' };
  var mapContainer = {};
  var adapterConfig = {
    map: {
      zoom: 10
    },
    text: {
      loadingText: 'Carregando'
    }
  };

  beforeAll(function () {
    window.google = _googleMapsAPIMock2.default;
  });

  describe('when init', function () {
    it('works', function () {
      expect(GoogleMapsAdapter.init(value, mapContainer, input, onChangeSpy, adapterConfig));
    });

    it('creates map', function () {
      expect(_googleMapsAPIMock2.default.maps.Map).toBeCalledWith(mapContainer, { zoom: 10 });
    });

    it('creates autocomplete', function () {
      expect(_googleMapsAPIMock2.default.maps.places.Autocomplete).toBeCalledWith(input, { types: ['geocode'] });
    });

    it('creates marker in correct position and map', function () {
      var map = _googleMapsAPIMock2.default.maps.Map.mock.instances[0];
      var position = { lat: 11, lng: 11 };

      expect(_googleMapsAPIMock2.default.maps.Marker).toBeCalledWith({ position: position, map: map });
    });

    it('centralizes the map by marker', function () {
      var map = _googleMapsAPIMock2.default.maps.Map.mock.instances[0];
      var marker = _googleMapsAPIMock2.default.maps.Marker.mock.instances[0];

      expect(map.setCenter).toBeCalledWith(marker.position);
    });

    describe('input', function () {
      it('is clear', function () {
        expect(input.value).toEqual('');
      });
    });
  });

  describe('when map is clicked', function () {
    beforeEach(function () {
      _googleMapsAPIMock2.default.maps.event.trigger('click', {
        latLng: { lat: 4, lng: 4 }
      });
    });

    it('changes marker position', function () {
      var marker = _googleMapsAPIMock2.default.maps.Marker.mock.instances[0];

      expect(marker.setPosition).toBeCalledWith({ lat: 4, lng: 4 });
    });

    it('inputs receive address', function () {
      expect(input.value).toEqual('Belo Horizonte - MG');
    });

    it('calls onChange with new position value', function () {
      expect(onChangeSpy).toBeCalledWith({ lat: 4, lng: 4 });
    });
  });

  describe('when search place', function () {
    beforeEach(function () {
      _googleMapsAPIMock2.default.maps.event.trigger('place_changed', {
        autocomplete: _googleMapsAPIMock2.default.maps.places.Autocomplete.mock.instances[0],
        map: _googleMapsAPIMock2.default.maps.Map.mock.instances[0],
        marker: _googleMapsAPIMock2.default.maps.Marker.mock.instances[0]
      });
    });

    it('changes marker position', function () {
      var marker = _googleMapsAPIMock2.default.maps.Marker.mock.instances[0];

      expect(marker.setPosition).toBeCalledWith({ lat: 5, lng: 5 });
    });

    it('centralizes the map', function () {
      expect(_googleMapsAPIMock2.default.maps.Map.mock.instances[0].setCenter).toBeCalledWith(_googleMapsAPIMock2.default.maps.Marker.mock.instances[0].position);
    });

    it('calls onChange with new position value', function () {
      expect(onChangeSpy).toBeCalledWith({ lat: 5, lng: 5 });
    });
  });
});