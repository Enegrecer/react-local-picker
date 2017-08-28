'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

exports.default = googleMapsAPIMock;