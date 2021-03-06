'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataActivatedBehavior = undefined;

var _broadcasterBehavior = require('./broadcaster-behavior');

var _widgetEventMessage = require('../events/widget-event-message');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataActivatedBehavior = exports.DataActivatedBehavior = function (_BroadcasterBehavior) {
  _inherits(DataActivatedBehavior, _BroadcasterBehavior);

  function DataActivatedBehavior(channel, eventAggregator) {
    _classCallCheck(this, DataActivatedBehavior);

    var _this = _possibleConstructorReturn(this, _BroadcasterBehavior.call(this));

    _this.channel = channel;
    _this.eventToAttach = "dataActivated";
    _this._eventAggregator = eventAggregator;
    return _this;
  }

  DataActivatedBehavior.prototype.attachToWidget = function attachToWidget(widget) {
    _BroadcasterBehavior.prototype.attachToWidget.call(this, widget);
    var me = this;

    widget[this.eventToAttach] = function (currentRecord) {
      var message = new _widgetEventMessage.WidgetEventMessage(me.widget.name);
      message.params = { activatedData: currentRecord };
      me._eventAggregator.publish(me.channel, message);
    };
  };

  DataActivatedBehavior.prototype.detach = function detach() {
    _BroadcasterBehavior.prototype.detach.call(this, dashboard);
  };

  return DataActivatedBehavior;
}(_broadcasterBehavior.BroadcasterBehavior);