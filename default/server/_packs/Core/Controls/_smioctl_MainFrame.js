(function() {
  /*
  Auto-generated from Core/Controls/MainFrame.ctl
  */  var smio, smoothio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  require('../../../_jscript/Control');
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_MainFrame = (function() {
    __extends(Packs_Core_Controls_MainFrame, smio.Control);
    function Packs_Core_Controls_MainFrame() {
      Packs_Core_Controls_MainFrame.__super__.constructor.apply(this, arguments);
    }
    Packs_Core_Controls_MainFrame.prototype.test = function() {
      var xy;
      return xy = "serverside";
    };
    return Packs_Core_Controls_MainFrame;
  })();
}).call(this);