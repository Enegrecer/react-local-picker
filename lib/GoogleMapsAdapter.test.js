'use strict';

var _GoogleMapsAdapter = require('./GoogleMapsAdapter');

var GoogleMapsAdapter = _interopRequireWildcard(_GoogleMapsAdapter);

var _google = require('./__mocks__/google');

var _google2 = _interopRequireDefault(_google);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

window.google = _google2.default;

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

  beforeEach(function () {
    clearAllMockFn();
    onChangeSpy.mockClear();
  });

  describe('when initiliazed with a map', function () {
    beforeEach(function () {
      GoogleMapsAdapter.init(value, mapContainer, input, onChangeSpy, adapterConfig);
    });

    it('creates map', function () {
      var map = getMap();
      expect(map).toBeCalledWith(mapContainer, { zoom: 10 });
    });

    it('creates autocomplete', function () {
      var autocomplete = getAutocomplete();
      expect(autocomplete).toBeCalledWith(input, { types: ['address'] });
    });

    it('creates marker in correct position and map', function () {
      var map = getMapMockInstance();
      var marker = getMarker();
      var position = { lat: 11, lng: 11 };

      expect(marker).toBeCalledWith({ position: position, map: map });
    });

    it('centralizes the map by marker', function () {
      var map = getMapMockInstance();
      var marker = getMarkerMockInstance();

      expect(map.setCenter).toBeCalledWith(marker.position);
    });

    describe('input', function () {
      it('is clear', function () {
        expect(input.value).toEqual('');
      });
    });

    describe('when map is clicked', function () {
      beforeEach(function () {
        fireEventInsideMaps('click', {
          latLng: { lat: 4, lng: 4 }
        });
      });

      it('changes marker position', function () {
        var marker = getMarkerMockInstance();

        expect(marker.setPosition).toBeCalledWith({ lat: 4, lng: 4 });
      });

      it('inputs receive address', function () {
        expect(input.value).toEqual('Belo Horizonte - MG');
      });

      it('calls onChange with new position value', function () {
        var expectedPosition = {
          lat: 5,
          lng: 5,
          address: []
        };

        expect(onChangeSpy).toBeCalledWith(expectedPosition);
      });
    });

    describe('when search place', function () {
      beforeEach(function () {
        fireEventInsideMaps('place_changed', null);
      });

      it('changes marker position', function () {
        var marker = getMarkerMockInstance();

        expect(marker.setPosition.mock.calls[0][0].lat()).toBe(5);
        expect(marker.setPosition.mock.calls[0][0].lng()).toBe(5);
      });

      it('centralizes the map', function () {
        var map = getMapMockInstance();
        var marker = getMarkerMockInstance();

        expect(map.setCenter).toBeCalledWith(marker.position);
      });

      it('calls onChange with new position value', function () {
        var expectedPosition = {
          lat: 5,
          lng: 5,
          address: []
        };

        expect(onChangeSpy).toBeCalledWith(expectedPosition);
      });
    });

    describe('when searching for a place does not return any results from google', function () {
      beforeEach(function () {
        getAutocompleteMockInstance().getPlace = function () {
          return {};
        };

        fireEventInsideMaps('place_changed', null);
      });

      it('does not change the marker position', function () {
        var marker = getMarkerMockInstance();

        expect(marker.setPosition).not.toHaveBeenCalled();
      });

      it('does not centralize the map', function () {
        var map = getMapMockInstance();
        var marker = getMarkerMockInstance();

        expect(map.setCenter).toHaveBeenCalledTimes(1);
      });

      it('does not call onChange with new position value', function () {
        var expectedPosition = {
          lat: 5,
          lng: 5,
          address: []
        };

        expect(onChangeSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('when initializing without a map', function () {
    beforeEach(function () {
      GoogleMapsAdapter.init(value, null, input, onChangeSpy, adapterConfig);
    });

    it('does not create map', function () {
      var map = getMap();
      expect(map).not.toBeCalled();
    });

    it('creates autocomplete', function () {
      var autocomplete = getAutocomplete();
      expect(autocomplete).toBeCalledWith(input, { types: ['address'] });
    });

    it('does not create a marker', function () {
      var marker = getMarker();

      expect(marker).not.toBeCalled();
    });

    describe('when search place', function () {
      beforeEach(function () {
        fireEventInsideMaps('place_changed', null);
      });

      it('calls onChange with new position value', function () {
        var expectedPosition = {
          lat: 5,
          lng: 5,
          address: []
        };

        expect(onChangeSpy).toBeCalledWith(expectedPosition);
      });
    });

    describe('when searching for a place does not return any results from google', function () {
      beforeEach(function () {
        getAutocompleteMockInstance().getPlace = function () {
          return {};
        };

        fireEventInsideMaps('place_changed', null);
      });

      it('does not call onChange with new position value', function () {
        var expectedPosition = {
          lat: 5,
          lng: 5,
          address: []
        };

        expect(onChangeSpy).not.toHaveBeenCalled();
      });
    });
  });
});

function clearAllMockFn() {
  window.google.maps.Map.mockClear();
  window.google.maps.Marker.mockClear();
  window.google.maps.Geocoder.mockClear();
  window.google.maps.places.Autocomplete.mockClear();
}

function getMapMockInstance() {
  return getMap().mock.instances[0];
}

function getMarkerMockInstance() {
  return getMarker().mock.instances[0];
}

function getAutocompleteMockInstance() {
  return getAutocomplete().mock.instances[0];
}

function getMap() {
  return window.google.maps.Map;
}

function getAutocomplete() {
  return window.google.maps.places.Autocomplete;
}

function getMarker() {
  return window.google.maps.Marker;
}

function fireEventInsideMaps(eventName, value) {
  window.google.maps.event.trigger(eventName, value);
}