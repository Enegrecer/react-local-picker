# react-local-picker
> React local picker with Google Maps API integration

## Install
```bash
npm install react-local-picker --save
// or
yarn add react-local-picker --save
```

## Getting Started
Putting your google API script tag in index.html.
```html
<script src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY_HERE]&libraries=places"></script>
```
## Usage Example
```javascript
import React from 'react';
import { LocalPicker, GoogleMapsAdapter } from 'react-local-picker'

class SomePage extends React.Component {
  render() {
    return (
      <LocalPicker
        adapter={GoogleMapsAdapter}
        value={{ lat: 0, lng: 0 }}
        onChange={value => console.log(value)}
        inputPlaceholder="Search here aqui..."
        adapterConfig={{
          map: {
            zoom: 10
          },
          text: {
            loadingText: 'Loading...'
          }
        }}
      />
    )
  }
}

export default SomePage;
```
## Component API
### adapter : Object
Receives a Map Api Service. In the moment the GoogleMapsAdapter is the only one. But, if do you want create other adapters to other services you are welcome ([read this section about write an adapter](#write-an-adapter)).
### value : Object
A value receives an object with lat and lng attributes that indicates de initial marker position on the map.
### onChange(value : Oject) : Function
Returns the new position of marker.
### inputPlaceholder : String
The text that will be display in input search.
### adapterConfig : Object
Adapter configurations. You can see below the correct configuration to your adapter.

## GoogleMapsAdapter Options
### map : Object
Is used to set some google maps api default options that you can be [seen here](https://developers.google.com/maps/documentation/javascript/).
### text : Object
Is used to store the text configs.
### text.loadingText : String
Is displayed when the component is loading the full adress from Google API.

## Write an Adapter
To write an Adapter you just need export an init function that will receive this props in sort. You can see how the [GoogleMapsAdapter](https://github.com/Enegrecer/react-local-picker/blob/master/src/lib/GoogleMapsAdapter.js) works.
- value
- mapContainer
- searchInput
- onChange
- config

### value : Object
A value receives an object with lat and lng attributes that indicates de initial marker position on the map.
### mapContainer : Object
It is a DOM reference from the map container/wrapper.
### searchInput : Object
It is a DOM reference from the search input.
### onChange(value : Oject) : Function
Needs be called after any marker position changes and returns the new position.
### config : Object
Any configuration that your adapter will need to works.
