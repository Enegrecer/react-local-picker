# react-local-picker
> React local picker with Google Maps API integration

[![Build Status](https://travis-ci.org/Enegrecer/react-local-picker.svg?branch=master)](https://travis-ci.org/Enegrecer/react-local-picker) [![Coverage Status](https://coveralls.io/repos/github/Enegrecer/react-local-picker/badge.svg?branch=master)](https://coveralls.io/github/Enegrecer/react-local-picker?branch=master)

## Demo
[https://enegrecer.github.io/react-local-picker/](https://enegrecer.github.io/react-local-picker/)

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
Receives a Map Api Service. At the moment, the GoogleMapsAdapter is the only one available. But, if you want create other adapters to other services you are very welcome ([read this section about write an adapter](#write-an-adapter)).
### value : Object
A value receives an object with lat and lng attributes that indicates the initial marker position on the map.
### onChange(value : Oject) : Function
Returns the new position of marker.
### inputPlaceholder : String
The text that will be displayed in the input search.
### adapterConfig : Object
Adapter settings. You can see below the correct configuration to your adapter.

## GoogleMapsAdapter Options
### map : Object
It’s used to set some google maps api default options that can be [seen here](https://developers.google.com/maps/documentation/javascript/).
### text : Object
It’s used to store the text configs.
### text.loadingText : String
It’s displayed when the component is loading the full address from Google API.

## Write an Adapter
To write an Adapter you just need to export an init function that will receive this props in sort. You can see how the [GoogleMapsAdapter](https://github.com/Enegrecer/react-local-picker/blob/master/src/lib/GoogleMapsAdapter.js) works.
- value
- mapContainer
- searchInput
- onChange
- config

### value : Object
A value receives an object with lat and lng attributes that indicates the initial marker position on the map.
### mapContainer : Object
It is a DOM reference to the map container/wrapper.
### searchInput : Object
It is a DOM reference to the search input.
### onChange(value : Oject) : Function
Needs be called after any marker position changes and returns the new position.
### config : Object
Any additional configuration that your adapter may need.
