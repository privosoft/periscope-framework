define(['exports', './dashboard-behavior', './../../helpers/string-helper', 'lodash'], function (exports, _dashboardBehavior, _stringHelper, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DrillDownHandleBehavior = undefined;

  var _ = _interopRequireWildcard(_lodash);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  var DrillDownHandleBehavior = exports.DrillDownHandleBehavior = function (_DashboardBehavior) {
    _inherits(DrillDownHandleBehavior, _DashboardBehavior);

    function DrillDownHandleBehavior(settings) {
      _classCallCheck(this, DrillDownHandleBehavior);

      var _this = _possibleConstructorReturn(this, _DashboardBehavior.call(this));

      _this._channel = settings.channel;
      _this._widgetType = settings.widgetType;
      _this._widgetSettings = settings.widgetSettings;
      _this._eventAggregator = settings.eventAggregator;
      _this._widgetToReplaceName = settings.widgetToReplaceName;
      return _this;
    }

    DrillDownHandleBehavior.prototype.attach = function attach(dashboard) {
      _DashboardBehavior.prototype.attach.call(this, dashboard);
      var me = this;
      this.subscription = this._eventAggregator.subscribe(this._channel, function (message) {
        var originatorWidget = dashboard.getWidgetByName(me._widgetToReplaceName);

        var w = new me._widgetType(me._widgetSettings);
        dashboard.replaceWidget(originatorWidget, w);
        w.dataFilter = message.params.dataFilter;
        w.dataSource.transport.readService.configure({ url: message.params.dataServiceUrl });
        w.refresh();
      });
    };

    DrillDownHandleBehavior.prototype.detach = function detach() {
      _DashboardBehavior.prototype.detach.call(this, dashboard);
      if (this.subscription) this.subscription.dispose();
    };

    return DrillDownHandleBehavior;
  }(_dashboardBehavior.DashboardBehavior);
});