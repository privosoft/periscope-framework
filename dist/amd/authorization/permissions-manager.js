define(['exports', 'lodash', './permissions-manager-configuration'], function (exports, _lodash, _permissionsManagerConfiguration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PermissionsManager = undefined;

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

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PermissionsManager = exports.PermissionsManager = function () {
    function PermissionsManager() {
      _classCallCheck(this, PermissionsManager);

      this._permissionsMatrix = [];
    }

    PermissionsManager.prototype.configure = function configure(config) {
      var normalizedConfig = new _permissionsManagerConfiguration.PermissionsManagerConfiguration();
      config(normalizedConfig);
      this._permissionsMatrix = normalizedConfig.permissionsMatrix;
      this._roleProvider = normalizedConfig.roleProvider;
    };

    PermissionsManager.prototype.hasPermisson = function hasPermisson(permission, resourceName) {
      var _this = this;

      return this._roleProvider.getRoles().then(function (roles) {
        var _loop = function _loop() {
          if (_isArray) {
            if (_i >= _iterator.length) return 'break';
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) return 'break';
            _ref = _i.value;
          }

          var r = _ref;

          var w = _.find(_this._permissionsMatrix, function (p) {
            return p.resource === resourceName && _.indexOf(p.roles, r) >= 0;
          });
          if (w) return {
              v: _.indexOf(w.permissions, permission) >= 0
            };
        };

        _loop2: for (var _iterator = roles, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          var _ret = _loop();

          switch (_ret) {
            case 'break':
              break _loop2;

            default:
              if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
          }
        }

        return false;
      });
    };

    return PermissionsManager;
  }();
});