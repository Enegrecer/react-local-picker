import React, { Component } from 'react';
import { LocalPicker, GoogleMapsAdapter } from './../lib';

class App extends Component {
  render() {
    return (
      <div style={{ padding: 40 }}>
        <a href="https://github.com/Enegrecer/react-local-picker"><img style={{ position: 'absolute', top: 0, right: 0, border: 0 }} src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png"/></a>
        <h1>Demo</h1>
        <a href="https://github.com/Enegrecer/react-local-picker">See here the doc</a>

        <br/><br/>

        <LocalPicker
          adapter={GoogleMapsAdapter}
          value={{ lat: -19.9166813, lng: -43.9344931 }}
          onChange={value => console.log(value)}
          inputPlaceholder="Search here..."
          adapterConfig={{
            map: {
              zoom: 16
            },
            text: {
              loadingText: 'Loading...'
            }
          }}
        />

        <br/><br/>

        <pre style={{ padding: 20, backgroundColor: '#f2f2f2' }}>
          {`
import { LocalPicker, GoogleMapsAdapter } from 'react-local-picker'

<LocalPicker
  adapter={GoogleMapsAdapter}
  value={{ lat: 0, lng: 0 }}
  onChange={value => console.log(value)}
  inputPlaceholder="Search here..."
  adapterConfig={{
    map: {
      zoom: 16
    },
    text: {
      loadingText: 'Loading...'
    }
  }}
/>
            `}
        </pre>
      </div>
    );
  }
}

export default App;
