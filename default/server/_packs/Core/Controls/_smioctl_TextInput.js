(function() {
  /*
  Auto-generated from Core/Controls/TextInput.ctl
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
  smio.Packs_Core_Controls_TextInput = (function() {
    __extends(Packs_Core_Controls_TextInput, smio.Control);
    Packs_Core_Controls_TextInput.prototype.renderTemplate = function() {
      var ret;
      ret = {
        span: {
          "class": 'smio-textinput',
          id: ''
        }
      };
      if (this.args.labelText) {
        ret.span.label = {
          id: 'label',
          "for": this.id('input'),
          html: [this.args.labelText]
        };
      }
      ret.span.input = {
        id: 'input',
        "class": 'smio-textinput',
        type: this.args.type === 'password' ? 'password' : 'text'
      };
      if (this.args.value) {
        ret.span.input.value = this.args.value;
      }
      if (this.args.nospellcheck) {
        ret.span.input.spellcheck = false;
      }
      return ret;
    };
    function Packs_Core_Controls_TextInput(client, parent, args) {
      Packs_Core_Controls_TextInput.__super__.constructor.call(this, client, parent, args, "Core_Controls", "Core_Controls_TextInput");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    return Packs_Core_Controls_TextInput;
  })();
}).call(this);