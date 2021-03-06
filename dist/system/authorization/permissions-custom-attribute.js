'use strict';

System.register(['aurelia-framework', 'lodash', './permissions-manager'], function (_export, _context) {
  var inject, bindable, _, PermissionsManager, _dec, _class, PermissionsCustomAttribute;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      inject = _aureliaFramework.inject;
      bindable = _aureliaFramework.bindable;
    }, function (_lodash) {
      _ = _lodash;
    }, function (_permissionsManager) {
      PermissionsManager = _permissionsManager.PermissionsManager;
    }],
    execute: function () {
      _export('PermissionsCustomAttribute', PermissionsCustomAttribute = (_dec = inject(Element, PermissionsManager), _dec(_class = function () {
        function PermissionsCustomAttribute(element, permissionsManager) {
          _classCallCheck(this, PermissionsCustomAttribute);

          this.element = element;
          this.permissionsManager = permissionsManager;
        }

        PermissionsCustomAttribute.prototype.bind = function bind() {
          var _this = this;

          if (!this.value) return;
          var rGroup = "";
          var permissions = [];
          if (_.isString(this.value)) {
            rGroup = this.element.au.permissions.scope.bindingContext.resourceGroup;
            permissions = this.value.split(",");
          } else if (_.isPlainObject(this.value)) {
            rGroup = this.value.resourceGroup;
            permissions = this.value.permissions.split(",");
          }

          this.element.hidden = true;
          this.element.disabled = true;

          var _loop = function _loop() {
            if (_isArray) {
              if (_i >= _iterator.length) return 'break';
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) return 'break';
              _ref = _i.value;
            }

            var p = _ref;

            _this.permissionsManager.hasPermisson(p, rGroup).then(function (result) {

              if (result) {
                if (p === 'read') _this.element.hidden = false;
                if (p === 'write') _this.element.disabled = false;
              }
            }, function (err) {});
          };

          for (var _iterator = permissions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            var _ret = _loop();

            if (_ret === 'break') break;
          }
        };

        return PermissionsCustomAttribute;
      }()) || _class));

      _export('PermissionsCustomAttribute', PermissionsCustomAttribute);
    }
  };
});