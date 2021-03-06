(function() {
  /*
  Auto-generated from Core/Controls/NatLangTime.ctl
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
  smio.Packs_Core_Controls_NatLangTime = (function() {
    __extends(Packs_Core_Controls_NatLangTime, smio.Control);
    Packs_Core_Controls_NatLangTime.prototype.renderTemplate = function() {
      return {
        "span .smio-dt": {
          id: '',
          title: "" + this.args.dt,
          'data-dt': this.args.dt.getTime(),
          _: [smio.Util.DateTime.stringify(this.args.dt)]
        }
      };
    };
    function Packs_Core_Controls_NatLangTime(client, parent, args) {
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_Controls_NatLangTime.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_NatLangTime.prototype.className = function() {
      return "Core_Controls_NatLangTime";
    };
    Packs_Core_Controls_NatLangTime.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_NatLangTime;
  })();
}).call(this);
