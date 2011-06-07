(function() {
  /*
  Auto-generated from Core/ServerSetup/OldInitialSiteSetup.ctl
  */  var smio, smoothio;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  smio = smoothio = global.smoothio;
  smio.Packs_Core_ServerSetup_OldInitialSiteSetup = (function() {
    __extends(Packs_Core_ServerSetup_OldInitialSiteSetup, smio.Control);
    Packs_Core_ServerSetup_OldInitialSiteSetup.prototype.onSlide = function(index, itemID) {
      return this.controls.steptabs.selectTab(itemID);
    };
    Packs_Core_ServerSetup_OldInitialSiteSetup.prototype.onTabSelect = function(tabID) {
      return this.controls.stepslide.scrollTo(tabID);
    };
    function Packs_Core_ServerSetup_OldInitialSiteSetup(client, parent, args) {
      Packs_Core_ServerSetup_OldInitialSiteSetup.__super__.constructor.call(this, client, parent, args, "Core_ServerSetup", "Core_ServerSetup_OldInitialSiteSetup");
      this.jsSelf = "smio.client.allControls['" + this.id() + "']";
      this.init();
    }
    Packs_Core_ServerSetup_OldInitialSiteSetup.prototype.renderHtml = function($el) {
      var tmp, __r;
      if (!this._html) {
        __r = {
          ctls: [],
          m: []
        };
        __r.o = __r.m;
        __r.o.push("\n<div class=\"smio-setup\" id=\"");
        __r.o.push(this.id());
        __r.o.push("\">\n\t<div class=\"smio-setup-outer smio-setup-outer-top\">\n\t\t<div class=\"smio-setup-header\">");
        __r.o.push(this.renderTag("r", "title", null));
        __r.o.push("</div>\n\t\t<div class=\"smio-setup-header-desc\">");
        __r.o.push(this.renderTag("r", "desc", null));
        __r.o.push("</div>\n\t</div>\n\t<div class=\"smio-setup-inner\">\n\t\t");
        tmp = [];
        __r.ctls.push({
          o: tmp,
          c: "SlidePanel",
          args: {
            id: 'stepslide',
            "class": 'smio-setup-stepslide',
            itemClass: 'smio-setup-stepbox',
            onItemSelect: __bind(function(i, id) {
              return this.onSlide(i, id);
            }, this)
          }
        });
        __r.o = tmp;
        __r.o.push("\n\t\t\t");
        tmp = [];
        __r.ctls.push({
          o: tmp,
          c: "item",
          args: {
            id: 'owner'
          }
        });
        __r.o = tmp;
        __r.o.push("\n\t\t\t\t<div class=\"smio-setup-stepbox-title\">");
        __r.o.push({
          t: "r",
          s: "steptitle_owner",
          a: null
        });
        __r.o.push("</div>\n\t\t\t\t<div class=\"smio-setup-stepbox-form\">\n\t\t\t\t\tblaa\n\t\t\t\t\t<br/><br/>\n\t\t\t\t\tfoo\n\t\t\t\t\t<br/><br/>\n\t\t\t\t\tyeah right\n\t\t\t\t</div>\n\t\t\t");
        tmp = __r.ctls.pop();
        __r.o = __r.ctls[0].o;
        __r.o.push({
          t: 'ctl',
          s: tmp.c,
          a: smio.Util.Object.mergeDefaults(tmp.args, {
            __o: tmp.o
          })
        });
        __r.o.push("\n\t\t\t");
        tmp = [];
        __r.ctls.push({
          o: tmp,
          c: "item",
          args: {
            id: 'template'
          }
        });
        __r.o = tmp;
        __r.o.push("\n\t\t\t\t<div class=\"smio-setup-stepbox-title\">");
        __r.o.push({
          t: "r",
          s: "steptitle_template",
          a: null
        });
        __r.o.push("</div>\n\t\t\t\t<div class=\"smio-setup-stepbox-form\">\n\t\t\t\t\tblaa\n\t\t\t\t\t<br/><br/>\n\t\t\t\t\tfoo\n\t\t\t\t\t<br/><br/>\n\t\t\t\t\tyeah right\n\t\t\t\t</div>\n\t\t\t");
        tmp = __r.ctls.pop();
        __r.o = __r.ctls[0].o;
        __r.o.push({
          t: 'ctl',
          s: tmp.c,
          a: smio.Util.Object.mergeDefaults(tmp.args, {
            __o: tmp.o
          })
        });
        __r.o.push("\n\t\t\t");
        tmp = [];
        __r.ctls.push({
          o: tmp,
          c: "item",
          args: {
            id: 'finish'
          }
        });
        __r.o = tmp;
        __r.o.push("\n\t\t\t\t<div class=\"smio-setup-stepbox-title\">");
        __r.o.push({
          t: "r",
          s: "steptitle_finish",
          a: null
        });
        __r.o.push("</div>\n\t\t\t\t<div class=\"smio-setup-stepbox-form\">\n\t\t\t\t\tthe finish line!!\n\t\t\t\t\t<br/>\n\t\t\t\t\tthis is where we ROLL...\n\t\t\t\t\t<br/><br/>\n\t\t\t\t\tcrazy innit?!\n\t\t\t\t</div>\n\t\t\t");
        tmp = __r.ctls.pop();
        __r.o = __r.ctls[0].o;
        __r.o.push({
          t: 'ctl',
          s: tmp.c,
          a: smio.Util.Object.mergeDefaults(tmp.args, {
            __o: tmp.o
          })
        });
        __r.o.push("\n\t\t");
        tmp = __r.ctls.pop();
        __r.o = __r.m;
        __r.o.push(this.renderTag('ctl', tmp.c, smio.Util.Object.mergeDefaults(tmp.args, {
          __o: tmp.o
        })));
        __r.o.push("\n\t</div>\n\t");
        __r.o.push(this.renderTag("ctl", "TabStrip", {
          id: 'steptabs',
          "class": 'smio-setup-outer smio-setup-steptabs',
          tabClass: 'smio-setup-steptab',
          tabs: ['owner', 'template', 'finish'],
          resPrefix: 'steps_',
          onTabSelect: __bind(function(tabID) {
            return this.onTabSelect(tabID);
          }, this)
        }));
        __r.o.push("\n</div>\n\n");
        this._html = __r.o.join('');
      }
      if ($el) {
        $el.html(this._html);
      }
      return this._html;
    };
    return Packs_Core_ServerSetup_OldInitialSiteSetup;
  })();
}).call(this);