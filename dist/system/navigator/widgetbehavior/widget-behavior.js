"use strict";

System.register([], function (_export, _context) {
  var WidgetBehavior;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export("WidgetBehavior", WidgetBehavior = function () {
        function WidgetBehavior() {
          _classCallCheck(this, WidgetBehavior);
        }

        WidgetBehavior.prototype.attachToWidget = function attachToWidget(widget) {
          this.widget = widget;
          this.widget.behavior.push(this);
        };

        WidgetBehavior.prototype.detach = function detach() {
          if (!this.widget) return;
          for (var i = 0; i < this.widget.behavior.length; i++) {
            if (this.widget.behavior[i] === this) {
              this.widget.behavior.splice(i, 1);
              break;
            }
          }
        };

        return WidgetBehavior;
      }());

      _export("WidgetBehavior", WidgetBehavior);
    }
  };
});