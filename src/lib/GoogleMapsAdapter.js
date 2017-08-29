export function init(value, mapContainer, searchInput, onChange, config) {
  const map = createMap(mapContainer, config.map)
  const marker = createMarker(value, map)
  const autocomplete = createAutoComplete(searchInput)

  centerMapInMarker(map, marker)

  map.addListener('click', event => {
    changeMarkerPosition(marker, event.latLng, onChange)
    updateAddress(event.latLng, searchInput, config.text.loadingText)
  })

  autocomplete.addListener('place_changed', event => {
    const newPlace = autocomplete.getPlace()

    changeMarkerPosition(marker, newPlace.geometry.location, onChange)
    centerMapInMarker(map, marker)
  })
}

function createMap(mapContainer, config) {
  return new window.google.maps.Map(
    mapContainer,
    config
  )
}

function createAutoComplete(input) {
  return new window.google.maps.places.Autocomplete(
    input,
    { types: ['address'] }
  )
}

function createMarker(position, map) {
  return new window.google.maps.Marker({
    position: new window.google.maps.LatLng(position.lat, position.lng),
    map
  })
}

function centerMapInMarker(map, marker) {
  map.setCenter(marker.position)
}

function changeMarkerPosition(marker, position, onChange) {
  marker.setPosition(position)
  onChange(position)
}

function updateAddress(position, input, loadingText) {
  const geocoder = new window.google.maps.Geocoder()

  input.value = loadingText

  geocoder.geocode({ location: position }, results => {
    input.value = results[0].formatted_address
  })
}
