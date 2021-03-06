define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var WidgetEvent = exports.WidgetEvent = function () {
    function WidgetEvent(widgetName) {
      _classCallCheck(this, WidgetEvent);

      this.handlers = [];

      this._originatorName = widgetName;
    }

    WidgetEvent.prototype.attach = function attach(handler) {
      if (this.handlers.some(function (e) {
        return e === handler;
      })) {
        return;
      }
      this.handlers.push(handler);
    };

    WidgetEvent.prototype.detach = function detach(handler) {
      var idx = this.handlers.indexOf(handler);
      if (idx < 0) {
        return;
      }
      this.handler.splice(idx, 1);
    };

    WidgetEvent.prototype.raise = function raise() {
      for (var i = 0; i < this.handlers.length; i++) {
        this.handlers[i].apply(this, arguments);
      }
    };

    _createClass(WidgetEvent, [{
      key: "originatorName",
      get: function get() {
        return this._originatorName;
      }
    }]);

    return WidgetEvent;
  }();
});