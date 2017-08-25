'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
function init(value, mapContainer, searchInput, onChange, config) {
  var map = createMap(mapContainer, config.map);
  var marker = createMarker(value, map);
  var autocomplete = createAutoComplete(searchInput);

  centerMapInMarker(map, marker);

  map.addListener('click', function (event) {
    changeMarkerPosition(marker, event.latLng, onChange);
    updateAddress(event.latLng, searchInput, config.text.loadingText);
  });

  autocomplete.addListener('place_changed', function (event) {
    var newPlace = autocomplete.getPlace();

    changeMarkerPosition(marker, newPlace.geometry.location, onChange);
    centerMapInMarker(map, marker);
  });
}

function createMap(mapContainer, config) {
  return new window.google.maps.Map(mapContainer, config);
}

function createAutoComplete(input) {
  return new window.google.maps.places.Autocomplete(input, { types: ['geocode'] });
}

function createMarker(position, map) {
  return new window.google.maps.Marker({
    position: new window.google.maps.LatLng(position.lat, position.lng),
    map: map
  });
}

function centerMapInMarker(map, marker) {
  map.setCenter(marker.position);
}

function changeMarkerPosition(marker, position, onChange) {
  marker.setPosition(position);
  onChange(position);
}

function updateAddress(position, input, loadingText) {
  var geocoder = new window.google.maps.Geocoder();

  input.value = loadingText;

  geocoder.geocode({ location: position }, function (results) {
    input.value = results[0].formatted_address;
  });
}