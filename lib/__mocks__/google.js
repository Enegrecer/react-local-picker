'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var google = {
  maps: {
    events: {},
    event: {
      trigger: function trigger(eventName, event) {
        google.maps.events[eventName](event);
      }
    },
    Map: jest.fn(function () {
      this.setCenter = jest.fn();
      this.addListener = function (eventName, callback) {
        google.maps.events[eventName] = callback;
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
          var results = [{
            formatted_address: 'Belo Horizonte - MG',
            geometry: {
              location: {
                lat: jest.fn(function () {
                  return 5;
                }),
                lng: jest.fn(function () {
                  return 5;
                })
              }
            },
            address_components: []
          }];

          callback(results);
        }
      };
    }),
    places: {
      Autocomplete: jest.fn(function () {
        this.addListener = function (eventName, callback) {
          google.maps.events[eventName] = callback;
        };
        this.getPlace = function () {
          return {
            geometry: {
              location: {
                lat: jest.fn(function () {
                  return 5;
                }),
                lng: jest.fn(function () {
                  return 5;
                })
              }
            },
            address_components: []
          };
        };
      })
    }
  }
};

exports.default = google;