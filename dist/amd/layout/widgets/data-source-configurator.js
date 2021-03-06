define(['exports', './widget', './../../navigator/events/widget-event'], function (exports, _widget, _widgetEvent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataSourceConfigurator = undefined;

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var DataSourceConfigurator = exports.DataSourceConfigurator = function (_Widget) {
    _inherits(DataSourceConfigurator, _Widget);

    function DataSourceConfigurator(settings) {
      _classCallCheck(this, DataSourceConfigurator);

      var _this = _possibleConstructorReturn(this, _Widget.call(this, settings));

      _this.dataSourceToConfigurate = settings.dataSourceToConfigurate;
      _this.stateType = "dataSourceConfiguratorState";
      _this._dataSourceChanged = new _widgetEvent.WidgetEvent();
      _this.attachBehaviors();
      return _this;
    }

    _createClass(DataSourceConfigurator, [{
      key: 'dataSourceToConfigurate',
      get: function get() {
        return this._dataSourceToConfigurate;
      },
      set: function set(value) {
        this._dataSourceToConfigurate = value;
      }
    }, {
      key: 'dataSourceChanged',
      get: function get() {
        return this._dataSourceChanged;
      },
      set: function set(handler) {
        this._dataSourceChanged.attach(handler);
      }
    }]);

    return DataSourceConfigurator;
  }(_widget.Widget);
});