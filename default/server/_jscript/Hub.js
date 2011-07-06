(function() {
  var mongodb, node_url, smio;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  require('./shared/PromiseProxy');
  require('./Database');
  mongodb = require('mongodb');
  node_url = require('url');
  smio = global.smoothio;
  smio.Hub = (function() {
    function Hub(session, url, rc) {
      var inst, server;
      this.session = session;
      this.url = url;
      this.rc = rc;
      this.getControlUpdates = __bind(this.getControlUpdates, this);
      this.invoke = __bind(this.invoke, this);
      this.create = __bind(this.create, this);
      this.checkExists = __bind(this.checkExists, this);
      this.doc = null;
      server = this.session.server;
      inst = server.inst;
      this.mongo = inst.getDbServer();
      this.dbAdmin = inst.getDb(this.mongo, 'admin');
      this.dbServer = inst.getDb(this.mongo, "smoothio__" + server.serverName);
      this.dbShared = inst.getDb(this.mongo, 'smoothio_shared');
      if (!this.url) {
        this.url = '/';
      }
      this.url = this.url.toLowerCase();
      this.uri = node_url.parse(this.url);
    }
    Hub.prototype.checkExists = function(cb_err_hasHubs) {
      if (this.doc) {
        return cb_err_hasHubs(null, true);
      } else {
        return this.dbServer.withCollection("hubs", __bind(function(err, col) {
          var makeQuery;
          if (err) {
            return cb_err_hasHubs(err);
          }
          makeQuery = function(url) {
            return function() {
              return url.indexOf(this.url) === 0;
            };
          };
          return col.find({
            $where: makeQuery(this.url)
          }).toArray(__bind(function(err, results) {
            if (err) {
              return cb_err_hasHubs(err);
            }
            if (results && results.length) {
              this.doc = _.sortBy(results, function(doc) {
                return -doc.url.length;
              })[0];
              return cb_err_hasHubs(null, true);
            } else {
              return col.find().nextObject(__bind(function(err, doc) {
                return cb_err_hasHubs(err, smio.iif(doc));
              }, this));
            }
          }, this));
        }, this));
      }
    };
    Hub.prototype.create = function(args, cb) {
      return null;
    };
    Hub.prototype.invoke = function(cmd, freq, fresp, cb) {
      smio.logit("INVOKE cmd: " + (JSON.stringify(cmd)));
      smio.logit("INVOKE freq: " + (JSON.stringify(freq)));
      return setTimeout((function() {
        return cb(new Error('foo'), null);
      }), 2000);
    };
    Hub.prototype.getControlUpdates = function(sinceTicks, freq, fresp, cb) {
      var ct;
      if (sinceTicks) {
        return cb(null, {});
      } else {
        ct = "Core_Controls_MainFrame";
        return this.checkExists(function(err, serverHasHubs) {
          if (!serverHasHubs) {
            if (fresp && freq && freq.settings()) {
              fresp.settings({
                bg: '/_/file/images/bg0.jpg'
              });
            }
            ct = "Core_ServerSetup_InitialHubSetup";
          }
          return cb(err, {
            '': {
              '_': ct
            }
          });
        });
      }
    };
    return Hub;
  })();
}).call(this);
