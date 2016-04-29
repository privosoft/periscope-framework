'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticJsonDataService = undefined;

var _dec, _dec2, _class;

var _aureliaFramework = require('aurelia-framework');

var _aureliaFetchClient = require('aurelia-fetch-client');

var _dataService = require('./data-service');

var _dataHelper = require('./../../helpers/data-helper');

var _queryExpressionEvaluator = require('./../query-expression-evaluator');

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StaticJsonDataService = exports.StaticJsonDataService = (_dec = (0, _aureliaFramework.transient)(), _dec2 = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = _dec2(_class = function (_DataService) {
  _inherits(StaticJsonDataService, _DataService);

  function StaticJsonDataService(http) {
    _classCallCheck(this, StaticJsonDataService);

    var _this = _possibleConstructorReturn(this, _DataService.call(this));

    http.configure(function (config) {
      config.useStandardConfiguration();
    });
    _this._http = http;
    return _this;
  }

  StaticJsonDataService.prototype.read = function read(options) {
    var _this2 = this;

    return this._http.fetch(this.url).then(function (response) {
      return response.json();
    }).then(function (jsonData) {
      var d = jsonData;
      d = _this2.dataMapper ? _this2.dataMapper(d) : d;
      if (options.filter) {
        var evaluator = new _queryExpressionEvaluator.QueryExpressionEvaluator();
        d = evaluator.evaluate(d, options.filter);
      }
      var total = d.length;

      if (options.sort) d = _.orderBy(d, [options.sort], [options.sortDir]);
      var l = options.skip + options.take;
      d = l ? _.slice(d, options.skip, l > d.length ? d.length : l) : d;
      if (options.fields && options.fields.length > 0) d = _.map(d, function (item) {
        return _.pick(item, options.fields);
      });
      return {
        data: _dataHelper.DataHelper.deserializeDates(d),
        total: _this2.totalMapper ? _this2.totalMapper(jsonData) : total
      };
    });
  };

  return StaticJsonDataService;
}(_dataService.DataService)) || _class) || _class);