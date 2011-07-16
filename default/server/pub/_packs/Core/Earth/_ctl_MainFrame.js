(function() {
  /*
  Auto-generated from Core/Earth/MainFrame.ctl
  */  var smio, smoothio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Earth_MainFrame = (function() {
    __extends(Packs_Core_Earth_MainFrame, smio.Control);
    Packs_Core_Earth_MainFrame.prototype.renderTemplate = function() {
      return {
        'div .smio-main': {
          id: '',
          'canvas #c3d .smio-canvas3d': {
            html: ['']
          }
        }
      };
    };
    Packs_Core_Earth_MainFrame.prototype.onLoad = function() {
      Packs_Core_Earth_MainFrame.__super__.onLoad.call(this);
      return new smio.gfx.Renderer(this.id('c3d'));
    };
    function Packs_Core_Earth_MainFrame(client, parent, args) {
      this.onLoad = __bind(this.onLoad, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Earth_MainFrame.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Earth_MainFrame.prototype.className = function() {
      return "Core_Earth_MainFrame";
    };
    Packs_Core_Earth_MainFrame.prototype.classNamespace = function() {
      return "Core_Earth";
    };
    return Packs_Core_Earth_MainFrame;
  })();
}).call(this);