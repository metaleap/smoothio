(function() {
  /*
  Auto-generated from Core/Controls/SlidePanel.ctl
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
  smio.Packs_Core_Controls_SlidePanel = (function() {
    __extends(Packs_Core_Controls_SlidePanel, smio.Control);
    Packs_Core_Controls_SlidePanel.prototype.renderTemplate = function() {
      var item, itemID, ul, _ref;
      ul = {
        "class": "smio-slidepanel " + (this.args["class"] || ''),
        'li #libefore': {
          html: ['&nbsp;']
        }
      };
      if (this.args.items) {
        _ref = this.args.items;
        for (itemID in _ref) {
          item = _ref[itemID];
          while (_.startsWith(itemID, '#')) {
            itemID = itemID.substr(1);
          }
          this.items.push(itemID);
          ul["li #items_" + itemID + " ." + (this.args.itemClass || '')] = item;
        }
      }
      ul['li #liafter'] = {
        html: ['&nbsp;']
      };
      return {
        div: {
          id: '',
          "class": "smio-slidepanel " + this.args["class"],
          'div #scrollbox .smio-slidepanel-scrollbox': {
            'ul #items': ul
          },
          'div #edgeprev .smio-slidepanel-edge .smio-slidepanel-edge-left': {
            'div .smio-slidepanel-edge-arr .x9668': {
              text: [this.r('slidepanel_prev')]
            }
          },
          'div #edgenext .smio-slidepanel-edge .smio-slidepanel-edge-right': {
            'div .smio-slidepanel-edge-arr .x9658': {
              text: [this.r('slidepanel_next')]
            }
          }
        }
      };
    };
    Packs_Core_Controls_SlidePanel.prototype.init = function() {
      this.curItem = 0;
      this.items = [];
      this.scrolling = false;
      Packs_Core_Controls_SlidePanel.__super__.init.call(this);
      if (this.args.onItemSelect && _.isFunction(this.args.onItemSelect)) {
        return this.on('itemSelect', this.args.onItemSelect);
      }
    };
    Packs_Core_Controls_SlidePanel.prototype.onLoad = function() {
      Packs_Core_Controls_SlidePanel.__super__.onLoad.call(this);
      (this.edgePrev = $("#" + (this.id('edgeprev')))).click(__bind(function() {
        return this.scrollTo(this.curItem - 1);
      }, this));
      (this.edgeNext = $("#" + (this.id('edgenext')))).click(__bind(function() {
        return this.scrollTo(this.curItem + 1);
      }, this));
      (this.scrollBox = $("#" + (this.id('scrollbox')))).scroll(_.debounce((__bind(function() {
        if (!this.scrolling) {
          return this.scrollTo(null, true);
        }
      }, this)), 250));
      return this.scrollTo(0, true);
    };
    Packs_Core_Controls_SlidePanel.prototype.onWindowResize = function(w, h) {
      return this.scrollTo(this.curItem, true);
    };
    Packs_Core_Controls_SlidePanel.prototype.scrollTo = function(item, force) {
      var distances, i, scrollLefts, tmp, _ref;
      if (item === null) {
        scrollLefts = [];
        distances = [];
        for (i = 0, _ref = this.items.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
          scrollLefts.push((tmp = this.scrollBox.scrollLeft() + $("#" + (this.id('items_' + this.items[i]))).position().left - this.edgePrev.width()));
          distances.push(Math.abs(tmp - this.scrollBox.scrollLeft()));
        }
        item = distances.indexOf(Math.min.apply(Math, distances));
      }
      if (_.isString(item)) {
        item = this.items.indexOf(item);
      }
      if (((item < 0) || (item >= this.items.length)) && force) {
        item = 0;
      }
      if ((force || item !== this.curItem) && (item >= 0) && (item < this.items.length)) {
        this.scrolling = true;
        this.edgePrev.css({
          display: item === 0 ? 'none' : 'block'
        });
        this.edgeNext.css({
          display: item === (this.items.length - 1) ? 'none' : 'block'
        });
        this.on('itemSelect', [this.curItem = item, this.items[item]]);
        return morpheus.tween(250, (__bind(function(pos) {
          return this.scrollBox.scrollLeft(pos);
        }, this)), (__bind(function() {
          return this.scrolling = false;
        }, this)), null, this.scrollBox.scrollLeft(), this.scrollBox.scrollLeft() + $("#" + (this.id('items_' + this.items[item]))).position().left - this.edgePrev.width());
      }
    };
    function Packs_Core_Controls_SlidePanel(client, parent, args) {
      Packs_Core_Controls_SlidePanel.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_Controls_SlidePanel.prototype.className = function() {
      return "Core_Controls_SlidePanel";
    };
    Packs_Core_Controls_SlidePanel.prototype.classNamespace = function() {
      return "Core_Controls";
    };
    return Packs_Core_Controls_SlidePanel;
  })();
}).call(this);