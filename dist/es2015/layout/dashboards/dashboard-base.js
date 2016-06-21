var _dec, _desc, _value, _class2;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

import { computedFrom } from 'aurelia-framework';
import * as _ from 'lodash';

export let DashboardBase = class DashboardBase {
  constructor() {
    this.layout = [];
    this.behaviors = [];
  }

  configure(dashboardConfiguration) {
    this.name = dashboardConfiguration.name;
    this.title = dashboardConfiguration.title;
    this.resourceGroup = dashboardConfiguration.resourceGroup;
  }

  getWidgetByName(widgetName) {
    var wl = _.find(this.layout, w => {
      return w.widget.name === widgetName;
    });
    if (wl) return wl.widget;
  }

  addWidget(widget, dimensions) {
    let lw = new LayoutWidget();
    lw.widget = widget;
    lw.sizeX = dimensions.sizeX;
    lw.sizeY = dimensions.sizeY;
    lw.col = dimensions.col;
    lw.row = dimensions.row;
    this.layout.push(lw);
    widget.dashboard = this;
  }

  removeWidget(widget) {
    _.remove(this.layout, w => {
      if (w.widget === widget) {
        widget.dispose();
        return true;
      }
      return false;
    });
  }

  replaceWidget(oldWidget, newWidget) {
    let oldLw = _.find(this.layout, w => {
      return w.widget === oldWidget;
    });
    if (oldLw) {
      newWidget.dashboard = this;
      let newLw = new LayoutWidget();
      newLw.widget = newWidget;
      newLw.sizeX = oldLw.sizeX;
      newLw.sizeY = oldLw.sizeY;
      newLw.col = oldLw.col;
      newLw.row = oldLw.row;

      newLw.navigationStack.push(oldWidget);
      this.layout.splice(_.indexOf(this.layout, oldLw), 1, newLw);
    }
  }

  restoreWidget(currentWidget) {
    let lw = _.find(this.layout, w => {
      return w.widget === currentWidget;
    });
    let previousWidget = lw.navigationStack.pop();
    if (previousWidget) {
      let previousLw = new LayoutWidget();
      previousLw.widget = previousWidget;
      previousLw.sizeX = lw.sizeX;
      previousLw.sizeY = lw.sizeY;
      previousLw.col = lw.col;
      previousLw.row = lw.row;
      this.layout.splice(_.indexOf(this.layout, lw), 1, previousLw);
    }
  }

  resizeWidget(widget, newSize) {
    var lw = _.find(this.layout, w => {
      return w.widget === widget;
    });
    if (newSize) {
      let x = newSize.sizeX ? newSize.sizeX : lw.sizeX;
      let y = newSize.sizeY ? newSize.sizeY : lw.sizeY;
      lw.resize(x, y);
    } else lw.rollbackResize();
  }

  refreshWidget(widget) {
    widget.refresh();
  }

  refresh() {
    for (let i = 0; i < this.layout.length; i++) {
      this.refreshWidget(this.layout[i].widget);
    }
  }

  dispose() {
    for (let i = 0; i < this.layout.length; i++) {
      this.layout[i].widget.dispose();
    }
    this.layout = [];

    while (true) {
      if (this.behaviors.length > 0) this.behaviors[0].detach();else break;
    }
  }
};

export let LayoutWidget = (_dec = computedFrom('navigationStack'), (_class2 = class LayoutWidget {
  constructor() {
    this.navigationStack = [];
    this.resized = false;
  }

  get hasNavStack() {
    return this.navigationStack && this.navigationStack.length > 0;
  }

  resize(newSizeX, newSizeY) {
    this._originalDimensions = { sizeX: this.sizeX, sizeY: this.sizeY };
    this.sizeX = newSizeX;
    this.sizeY = newSizeY;
    this.resized = true;
  }

  rollbackResize() {
    if (this._originalDimensions) {
      this.sizeX = this._originalDimensions.sizeX;
      this.sizeY = this._originalDimensions.sizeY;
    }
    this.resized = false;
  }

}, (_applyDecoratedDescriptor(_class2.prototype, 'hasNavStack', [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, 'hasNavStack'), _class2.prototype)), _class2));