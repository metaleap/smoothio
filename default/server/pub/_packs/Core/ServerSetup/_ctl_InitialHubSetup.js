(function() {
  /*
  Auto-generated from Core/ServerSetup/InitialHubSetup.ctl
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
  smio.Packs_Core_ServerSetup_InitialHubSetup = (function() {
    __extends(Packs_Core_ServerSetup_InitialHubSetup, smio.Control);
    Packs_Core_ServerSetup_InitialHubSetup.prototype.renderTemplate = function() {
      return {
        "div .smio-box": {
          "id": '',
          "div .smio-setup": {
            "div .smio-setup-outer .smio-setup-outer-top": {
              "div .smio-setup-header": {
                html: [this.r('title')]
              },
              "div .smio-setup-header-desc": [this.r('desc')]
            },
            "div .smio-setup-inner": {
              "SlidePanel #stepslide .smio-setup-stepslide": {
                itemClass: 'smio-setup-stepbox',
                onItemSelect: this.onSlide,
                items: {
                  "#owner": {
                    'div .smio-setup-stepbox-title': [this.r('steptitle_owner')],
                    'div .smio-setup-stepbox-form': {
                      "Controls #user": {
                        ctltype: 'TextInput',
                        onChange: __bind(function() {
                          return this.verifyInputs;
                        }, this),
                        required: true,
                        nospellcheck: true,
                        labelText: __bind(function(id) {
                          return "owner_" + id;
                        }, this),
                        placeholder: __bind(function(id) {
                          return "owner_" + id + "hint";
                        }, this),
                        type: __bind(function(id) {
                          if (id !== 'name') {
                            return 'password';
                          } else {
                            return '';
                          }
                        }, this),
                        items: ['#name', '#pass', '#pass2']
                      },
                      "div .smio-setup-stepbox-form-label": {
                        html: [this.r('owner_choice')]
                      },
                      "Controls #owner": {
                        ctltype: 'Toggle',
                        disabled: true,
                        name: this.id('owner_toggle'),
                        items: {
                          "#create": {
                            checked: true,
                            labelHtml: ['owner_create', 'localhost']
                          },
                          "#login": {
                            labelHtml: ['owner_login', 'localhost']
                          }
                        }
                      }
                    }
                  },
                  "#template": {
                    "div .smio-setup-stepbox-title": [this.r('steptitle_template')],
                    "div .smio-setup-stepbox-form": {
                      text: ['Hub templates are not yet available.']
                    }
                  },
                  "#finish": {
                    "div .smio-setup-stepbox-title": [this.r('steptitle_finish')],
                    "div .smio-setup-stepbox-form": {
                      "TextInput #hubtitle": {
                        required: true,
                        placeholder: 'hub_titlehint',
                        labelText: 'hub_title',
                        onChange: this.verifyInputs
                      },
                      "div .smio-setup-stepbox-form-label": {
                        html: [this.r('hub_hint')]
                      },
                      "Controls #bg": {
                        ctltype: 'Toggle',
                        name: this.id('hub_bg'),
                        checked: __bind(function(id) {
                          return id === 'bg0';
                        }, this),
                        labelHtml: __bind(function(id) {
                          return 'nbsp';
                        }, this),
                        style: __bind(function(id) {
                          return {
                            'background-image': "url('/_/file/images/" + id + ".jpg')"
                          };
                        }, this),
                        onCheck: __bind(function(id) {
                          return __bind(function(chk) {
                            if (chk) {
                              return this.client.pageBody.css({
                                "background-image": "url('/_/file/images/" + id + ".jpg')"
                              });
                            }
                          }, this);
                        }, this),
                        items: ['#bg0', '#bg1', '#bg2', '#bg3', '#bg4']
                      },
                      "div .smio-setup-createbtn": {
                        "LinkButton #hub_create .smio-bigbutton": {
                          disabled: true,
                          labelText: 'hub_create',
                          invoke: {
                            html: '&#x279C;',
                            'Hub.create': __bind(function() {
                              return {
                                u: this.input('user/name').val(),
                                p: this.input('user/pass').val(),
                                t: this.input('hubtitle').val()
                              };
                            }, this),
                            onResult: this.onCreateHubResult
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "TabStrip #steptabs .smio-setup-outer .smio-setup-steptabs": {
              "tabClass": 'smio-setup-steptab',
              "tabs": ['owner', 'template', 'finish'],
              "resPrefix": 'steps_',
              "onTabSelect": __bind(function(tabID) {
                return this.onTabSelect(tabID);
              }, this)
            }
          }
        }
      };
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.input = function(sp) {
      return this.sub("stepslide/" + sp + "/input");
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onCreateHubResult = function(errs, result, fresp) {
      return;
      if (errs) {
        return alert(JSON.stringify(errs));
      } else if (result) {
        return alert('no prob');
      } else {
        return alert('noooo');
      }
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onLoad = function() {
      var $p1, $p2, $t, $u, _ref;
      Packs_Core_ServerSetup_InitialHubSetup.__super__.onLoad.call(this);
      if (this.urlSeg() !== '/') {
        location.replace('/');
      }
      _ref = [this.input('user/name'), this.input('user/pass'), this.input('user/pass2'), this.input('hubtitle')], $u = _ref[0], $p1 = _ref[1], $p2 = _ref[2], $t = _ref[3];
      $u.val('test');
      $p1.val('test');
      $p2.val('test');
      $t.val('test');
      this.verifyInputs();
      return setTimeout((__bind(function() {
        return this.onTabSelect('finish');
      }, this)), 250);
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onSlide = function(index, itemID) {
      return this.ctl('steptabs').selectTab(itemID);
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.onTabSelect = function(tabID) {
      return this.ctl('stepslide').scrollTo(tabID);
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.urlSeg = function() {
      var urlseg;
      if ((urlseg = _.trim(this.client.pageUrl.attr('path'), '/'))) {
        return "/" + urlseg + "/";
      } else {
        return '/';
      }
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.verifyInputs = function() {
      var $p1, $p2, $t, $u, tmp, _ref;
      _ref = [this.input('user/name'), this.input('user/pass'), this.input('user/pass2'), this.input('hubtitle')], $u = _ref[0], $p1 = _ref[1], $p2 = _ref[2], $t = _ref[3];
      if ($u.val() !== (tmp = smio.Util.String.idify(_.trim($u.val())))) {
        $u.val(tmp);
      }
      if ($t.val() !== (tmp = _.trim($t.val()))) {
        $t.val(tmp);
      }
      return this.ctl('stepslide/hub_create').disable(!($u.val() && $p1.val() && $p2.val() && ($p1.val() === $p2.val()) && $t.val()));
    };
    function Packs_Core_ServerSetup_InitialHubSetup(client, parent, args) {
      this.verifyInputs = __bind(this.verifyInputs, this);
      this.urlSeg = __bind(this.urlSeg, this);
      this.onTabSelect = __bind(this.onTabSelect, this);
      this.onSlide = __bind(this.onSlide, this);
      this.onLoad = __bind(this.onLoad, this);
      this.onCreateHubResult = __bind(this.onCreateHubResult, this);
      this.input = __bind(this.input, this);
      this.renderTemplate = __bind(this.renderTemplate, this);      Packs_Core_ServerSetup_InitialHubSetup.__super__.constructor.call(this, client, parent, args);
      this.init();
    }
    Packs_Core_ServerSetup_InitialHubSetup.prototype.className = function() {
      return "Core_ServerSetup_InitialHubSetup";
    };
    Packs_Core_ServerSetup_InitialHubSetup.prototype.classNamespace = function() {
      return "Core_ServerSetup";
    };
    return Packs_Core_ServerSetup_InitialHubSetup;
  })();
}).call(this);
