/*
 * thematrix
 * https://github.com/100hz/node-thematrix
 *
 * Copyright (c) 2013 Sebastian Krüger
 * Licensed under the MIT license.
*/

var ThematrixAspect;

require('colors');

ThematrixAspect = (function() {
  function ThematrixAspect() {}

  ThematrixAspect.fill = function(fill, min) {
    if (fill.length === 0) {
      fill = "THEMATRIX";
    }
    if (fill.length < min) {
      return fill = Array(Math.ceil(min / fill.length) + 1).join(fill);
    }
  };

  ThematrixAspect.prototype.render = function() {
    var state;
    this.renderings += 1;
    state = this.state();
    if ((state != null)) {
      state.call(this);
      return this.timer();
    }
  };

  ThematrixAspect.prototype.print = function() {
    return process.stdout.write(this.buf.toString().green);
  };

  ThematrixAspect.prototype.fadeInLine = function(i, j, random) {
    var c, index, _i, _ref, _results;
    _results = [];
    for (c = _i = 0, _ref = this.fill.length; 0 <= _ref ? _i < _ref : _i > _ref; c = 0 <= _ref ? ++_i : --_i) {
      index = (j - c) * this.w + i;
      if (index >= 0) {
        _results.push(this.buf[index] = this.randomChar());
      } else {
        break;
      }
    }
    return _results;
  };

  ThematrixAspect.prototype.fadeIn = function() {
    var d, i, _base, _i, _ref;
    if (this.i == null) {
      this.i = 0;
    }
    if (this.j == null) {
      this.j = 0;
    }
    if (this.lines == null) {
      this.lines = [];
    }
    for (i = _i = 0, _ref = this.w; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if ((_base = this.lines)[i] == null) {
        _base[i] = -this.randomDistance();
      }
      d = this.lines[i];
      if (d > -1 && this.randomFlow()) {
        this.fadeInLine(i, d, d === this.h);
      }
      if (d < this.h) {
        this.lines[i] += 1;
      }
    }
    return this.print();
  };

  ThematrixAspect.prototype.randomDistance = function() {
    return Math.floor(Math.random() * this.distance);
  };

  ThematrixAspect.prototype.randomFlow = function() {
    return Math.random() > 0.5;
  };

  ThematrixAspect.prototype.randomChar = function() {
    return this.fill.charCodeAt(Math.floor(Math.random() * this.fill.length));
  };

  ThematrixAspect.prototype.timer = function() {
    var self;
    self = this;
    return setTimeout(function() {
      return self.render();
    }, this.interval);
  };

  ThematrixAspect.prototype.state = function() {
    if ((this.i == null) && (this.j == null)) {
      return this.fadeIn;
    } else if (this.i < this.w && this.j < this.h) {
      return this.fadeIn;
    }
  };

  ThematrixAspect.prototype.thematrix = function(options) {
    var i, _i, _ref;
    if (options == null) {
      options = {
        interval: 50,
        w: 80,
        h: 24,
        distance: 20
      };
    }
    this.interval = options.interval, this.w = options.w, this.h = options.h, this.distance = options.distance;
    this.fill = ThematrixAspect.fill(this.toString(), this.h);
    this.buf = new Buffer(this.w * this.h);
    for (i = _i = 0, _ref = this.buf.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      this.buf[i] = ' '.charCodeAt(0);
    }
    this.renderings = 0;
    return this.render();
  };

  return ThematrixAspect;

})();

module.exports = ThematrixAspect;
