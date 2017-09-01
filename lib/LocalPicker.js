'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalPicker = function (_React$Component) {
  _inherits(LocalPicker, _React$Component);

  function LocalPicker() {
    _classCallCheck(this, LocalPicker);

    return _possibleConstructorReturn(this, (LocalPicker.__proto__ || Object.getPrototypeOf(LocalPicker)).apply(this, arguments));
  }

  _createClass(LocalPicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.adapter.init(this.props.value, this.mapContainer, this.input, this.props.onChange, this.props.adapterConfig);
    }
  }, {
    key: 'getContainerStyle',
    value: function getContainerStyle() {
      return _extends({
        border: '1px solid #CCC'
      }, this.props.containerSyle);
    }
  }, {
    key: 'getInputStyle',
    value: function getInputStyle() {
      return _extends({
        width: '100%',
        padding: 16,
        fontSize: 16,
        border: 0,
        boxSizing: 'border-box'
      }, this.props.inputStyle);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { style: this.getContainerStyle() },
        _react2.default.createElement('input', {
          ref: function ref(input) {
            return _this2.input = input;
          },
          style: this.getInputStyle(),
          type: 'text',
          placeholder: this.props.inputPlaceholder
        }),
        _react2.default.createElement('div', {
          style: { height: this.props.height },
          ref: function ref(mapContainer) {
            return _this2.mapContainer = mapContainer;
          }
        })
      );
    }
  }]);

  return LocalPicker;
}(_react2.default.Component);

LocalPicker.propTypes = {
  value: _propTypes2.default.shape({
    lat: _propTypes2.default.number.isRequired,
    lng: _propTypes2.default.number.isRequired
  }).isRequired,
  height: _propTypes2.default.number,
  inputPlaceholder: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  containerSyle: _propTypes2.default.object,
  inputStyle: _propTypes2.default.object,
  adapterConfig: _propTypes2.default.object
};

LocalPicker.defaultProps = {
  height: 300
};

exports.default = LocalPicker;