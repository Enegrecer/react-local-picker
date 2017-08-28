import React from 'react';
import PropTypes from 'prop-types';

class LocalPicker extends React.Component {
  componentDidMount() {
    this.props.adapter.init(
      this.props.value,
      this.mapContainer,
      this.input,
      this.props.onChange,
      this.props.adapterConfig
    )
  }

  getContainerStyle() {
    return {
      border: '1px solid #CCC',
      ...this.props.containerSyle
    }
  }

  getInputStyle() {
    return {
      width: '100%',
      padding: 16,
      fontSize: 16,
      border: 0,
      boxSizing: 'border-box',
      ...this.props.inputStyle
    }
  }

  render() {
    return (
      <div style={this.getContainerStyle()}>
        <input
          ref={input => this.input = input}
          style={this.getInputStyle()}
          type="text"
          placeholder={this.props.inputPlaceholder}
        />

        <div
          style={{ height: this.props.height }}
          ref={mapContainer => this.mapContainer = mapContainer}
        />
      </div>
    )
  }
}

LocalPicker.propTypes = {
  value: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  height: PropTypes.number,
  inputPlaceholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  containerSyle: PropTypes.object,
  inputStyle: PropTypes.object,
  adapterConfig: PropTypes.object
}

LocalPicker.defaultProps = {
  height: 300
}

export default LocalPicker
