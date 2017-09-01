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
    changeMarkerPosition(marker, event.latLng);
    updateAddressAndFireOnChange(event.latLng, searchInput, config.text.loadingText, onChange);
  });

  autocomplete.addListener('place_changed', function () {
    var newPlace = autocomplete.getPlace();
    var validPlaceFound = newPlace.geometry && newPlace.address_components;

    if (validPlaceFound) {
      changeMarkerPosition(marker, newPlace.geometry.location);
      centerMapInMarker(map, marker);
      fireOnChangeEvent(newPlace.geometry.location, newPlace.address_components, onChange);
    }
  });
}

function createMap(mapContainer, config) {
  return new window.google.maps.Map(mapContainer, config);
}

function createAutoComplete(input) {
  return new window.google.maps.places.Autocomplete(input, { types: ['address'] });
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

function changeMarkerPosition(marker, position) {
  marker.setPosition(position);
}

function fireOnChangeEvent(latLng, addressComponents, onChange) {
  var eventValue = {
    lat: latLng.lat(),
    lng: latLng.lng(),
    address: addressComponents
  };
  onChange(eventValue);
}

function updateAddressAndFireOnChange(position, input, loadingText, onChange) {
  var geocoder = new window.google.maps.Geocoder();

  input.value = loadingText;

  geocoder.geocode({ location: position }, function (results) {
    var closestResult = results[0];
    input.value = closestResult.formatted_address;
    fireOnChangeEvent(closestResult.geometry.location, closestResult.address_components, onChange);
  });
}