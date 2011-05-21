(function() {
  /*
  Auto-generated from SmoothioCore/CommonControls/console.ctl
  */  var smio, smoothio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  smio = smoothio = global.smoothio;
  smio.Packs_SmoothioCore_CommonControls_console = (function() {
    __extends(Packs_SmoothioCore_CommonControls_console, smio.Control);
    function Packs_SmoothioCore_CommonControls_console(args) {
      Packs_SmoothioCore_CommonControls_console.__super__.constructor.call(this, args, "SmoothioCore_CommonControls", "SmoothioCore_CommonControls_console");
    }
    Packs_SmoothioCore_CommonControls_console.prototype.renderHtml = function() {
      var parts;
      if (!this._html) {
        parts = [];
        if (this.args['topDown']) {
          parts.push("\n<div id=\"");
          parts.push(this.id());
          parts.push("\" class=\"smio-console smio-console-top\">\n\t<div class=\"smio-console-ever\">header</div>\n\t<div class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div class=\"smio-console-detail\" style=\"display: none;\">details</div>\n</div>\n");
        } else {
          parts.push("\n<div id=\"");
          parts.push(this.id());
          parts.push("\" class=\"smio-console smio-console-bottom\">\n\t<div class=\"smio-console-detail\" style=\"display: none;\">details</div>\n\t<div class=\"smio-console-hover\" style=\"display: none;\">hover</div>\n\t<div class=\"smio-console-ever\">footer</div>\n</div>\n\n");
        }
        this._html = parts.join('');
      }
      return this._html;
    };
    return Packs_SmoothioCore_CommonControls_console;
  })();
}).call(this);
