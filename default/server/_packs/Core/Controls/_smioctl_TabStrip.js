(function() {
  /*
  Auto-generated from Core/Controls/TabStrip.ctl
  */  var smio, smoothio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  require('../../../_jscript/shared/Control');
  smio = smoothio = global.smoothio;
  smio.Packs_Core_Controls_TabStrip = (function() {
    __extends(Packs_Core_Controls_TabStrip, smio.Control);
    function Packs_Core_Controls_TabStrip(client, parent, args) {
      Packs_Core_Controls_TabStrip.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_TabStrip");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    return Packs_Core_Controls_TabStrip;
  })();
}).call(this);
