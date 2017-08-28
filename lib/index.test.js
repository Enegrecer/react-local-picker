'use strict';

var _ = require('./');

describe('Index file', function () {
  it('exports LocalPicker', function () {
    expect(_.LocalPicker).not.toBeUndefined();
  });

  it('exports GoogleMapsAdapter', function () {
    expect(_.GoogleMapsAdapter).not.toBeUndefined();
  });
});