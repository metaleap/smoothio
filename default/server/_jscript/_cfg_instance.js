(function() {
  /*
  Do not modify: auto-generated from ((your-instance-folder))/instance.ccfg
  */  module.exports = {
    smoothio: {
      autorestart: {
        on_files_changed: true,
        on_crash_after_uptime_secs: 120
      },
      logging: {
        details: false,
        stack: false,
        path: 'server/log/smoothio.log'
      },
      language: 'en',
      dns_preresolve: {
        enabled: true,
        hostnames: {
          localhost: '127.0.0.1',
          '$localhostname': '127.0.0.1'
        }
      },
      enabled: true,
      minify: false,
      processes: 1
    },
    servers: {
      server1: {
        host: 'localhost',
        port: 2020
      }
    },
    fooignore: {
      server2: {
        host: '192.168.56.1',
        port: 4040
      },
      server3: {
        host: '192.168.42.203',
        port: 6060
      }
    },
    mongodb: {
      host: '127.0.0.1',
      port: 61234,
      dbpath: 'server/dbs/',
      logpath: 'server/log/mongodb/mongodb.log'
    }
  };
}).call(this);
