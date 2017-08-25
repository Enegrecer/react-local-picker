'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LocalPicker = require('./LocalPicker');

var _LocalPicker2 = _interopRequireDefault(_LocalPicker);

var _GoogleMapsAdapter = require('./GoogleMapsAdapter');

var GoogleMapsAdapter = _interopRequireWildcard(_GoogleMapsAdapter);

var _enzyme = require('enzyme');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var googleMapsAPIMock = {
  maps: {
    events: {},
    event: {
      trigger: function trigger(eventName, event) {
        googleMapsAPIMock.maps.events[eventName](event);
      }
    },
    Map: jest.fn(function () {
      this.setCenter = jest.fn();
      this.addListener = function (eventName, callback) {
        googleMapsAPIMock.maps.events[eventName] = callback;
      };
    }),
    LatLng: function LatLng(lat, lng) {
      return { lat: lat, lng: lng };
    },
    Marker: jest.fn(function () {
      this.setPosition = jest.fn();
    }),
    Geocoder: jest.fn(function () {
      return {
        geocode: function geocode(location, callback) {
          var results = [{ formatted_address: 'Belo Horizonte - MG' }];

          callback(results);
        }
      };
    }),
    places: {
      Autocomplete: jest.fn(function () {
        this.addListener = function (eventName, callback) {
          googleMapsAPIMock.maps.events[eventName] = callback;
        };
        this.getPlace = function () {
          return {
            geometry: {
              location: {
                lat: 5,
                lng: 5
              }
            }
          };
        };
      })
    }
  }
};

describe('LocalPicker', function () {
  var wrapper = void 0;

  var onChangeSpy = jest.fn();

  beforeAll(function () {
    window.google = googleMapsAPIMock;
  });

  afterEach(function () {
    onChangeSpy.mockClear();
  });

  describe('when mount', function () {
    it('works', function () {
      expect(wrapper = (0, _enzyme.mount)(_react2.default.createElement(_LocalPicker2.default, {
        value: { lat: 11, lng: 11 },
        onChange: onChangeSpy,
        loadingText: 'Carregando...',
        inputPlaceholder: 'Pesquise aqui...',
        adapter: GoogleMapsAdapter,
        adapterConfig: {
          map: {
            zoom: 10
          },
          text: {
            loadingText: 'Carregando'
          }
        }
      })));
    });

    it('creates map', function () {
      expect(googleMapsAPIMock.maps.Map).toBeCalledWith(wrapper.instance().mapContainer, { zoom: 10 });
    });

    it('creates autocomplete', function () {
      expect(googleMapsAPIMock.maps.places.Autocomplete).toBeCalledWith(wrapper.instance().input, { types: ['geocode'] });
    });

    it('creates marker in correct position and map', function () {
      var map = googleMapsAPIMock.maps.Map.mock.instances[0];
      var position = { lat: 11, lng: 11 };

      expect(googleMapsAPIMock.maps.Marker).toBeCalledWith({ position: position, map: map });
    });

    it('centralizes the map by marker', function () {
      var map = googleMapsAPIMock.maps.Map.mock.instances[0];
      var marker = googleMapsAPIMock.maps.Marker.mock.instances[0];

      expect(map.setCenter).toBeCalledWith(marker.position);
    });

    describe('input', function () {
      it('is clear', function () {
        expect(wrapper.instance().input.value).toEqual('');
      });
    });
  });

  describe('when map is clicked', function () {
    beforeEach(function () {
      googleMapsAPIMock.maps.event.trigger('click', {
        latLng: { lat: 4, lng: 4 }
      });
    });

    it('changes marker position', function () {
      var marker = googleMapsAPIMock.maps.Marker.mock.instances[0];

      expect(marker.setPosition).toBeCalledWith({ lat: 4, lng: 4 });
    });

    it('inputs receive address', function () {
      expect(wrapper.instance().input.value).toEqual('Belo Horizonte - MG');
    });

    it('calls onChange with new position value', function () {
      expect(onChangeSpy).toBeCalledWith({ lat: 4, lng: 4 });
    });
  });

  describe('when search place', function () {
    beforeEach(function () {
      googleMapsAPIMock.maps.event.trigger('place_changed', {
        autocomplete: googleMapsAPIMock.maps.places.Autocomplete.mock.instances[0],
        map: googleMapsAPIMock.maps.Map.mock.instances[0],
        marker: googleMapsAPIMock.maps.Marker.mock.instances[0]
      });
    });

    it('changes marker position', function () {
      var marker = googleMapsAPIMock.maps.Marker.mock.instances[0];

      expect(marker.setPosition).toBeCalledWith({ lat: 5, lng: 5 });
    });

    it('centralizes the map', function () {
      expect(googleMapsAPIMock.maps.Map.mock.instances[0].setCenter).toBeCalledWith(googleMapsAPIMock.maps.Marker.mock.instances[0].position);
    });

    it('calls onChange with new position value', function () {
      expect(onChangeSpy).toBeCalledWith({ lat: 5, lng: 5 });
    });
  });
});