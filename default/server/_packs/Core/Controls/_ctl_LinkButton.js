(function() {
  /*
  Auto-generated from Core/Controls/LinkButton.ctl
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
  smio.Packs_Core_Controls_LinkButton = (function() {
    __extends(Packs_Core_Controls_LinkButton, smio.Control);
    function Packs_Core_Controls_LinkButton(client, parent, args) {
      Packs_Core_Controls_LinkButton.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_LinkButton.prototype.className = function() {
      return "Core_Controls_LinkButton";
    };
    Packs_Core_Controls_LinkButton.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_LinkButton;
  })();
}).call(this);
