'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LocalPicker = require('./LocalPicker');

var _LocalPicker2 = _interopRequireDefault(_LocalPicker);

var _enzyme = require('enzyme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('LocalPicker', function () {
  var wrapper = void 0;

  var adapterMock = {
    init: jest.fn()
  };

  describe('when mounts', function () {
    it('works', function () {
      wrapper = (0, _enzyme.mount)(_react2.default.createElement(_LocalPicker2.default, {
        value: { lat: 5, lng: 5 },
        adapter: adapterMock,
        loadingText: 'Loading...',
        inputPlaceholder: 'Search here...',
        onChange: function onChange() {}
      }));
    });

    it('inits adapter', function () {
      expect(adapterMock.init).toBeCalled();
    });
  });

  describe('input', function () {
    it('exists', function () {
      expect(wrapper.instance().input).not.toBeUndefined();
    });
  });

  describe('map container', function () {
    it('exists', function () {
      expect(wrapper.instance().mapContainer).not.toBeUndefined();
    });
  });
});