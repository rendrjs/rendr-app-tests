var path = require('path');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    handlebars: {
      compile: {
        options: {
          namespace: false,
          commonjs: true,
          processName: function(filename) {
            return filename.replace('app/templates/', '').replace('.hbs', '');
          }
        },
        src: "app/templates/**/*.hbs",
        dest: "app/templates/compiledTemplates.js",
        filter: function(filepath) {
          var filename = path.basename(filepath);
          // Exclude files that begin with '__' from being sent to the client,
          // i.e. __layout.hbs.
          return filename.slice(0, 2) !== '__';
        }
      }
    },

    browserify: {
      options: {
        debug: true,
        alias: [
          '../node_modules/handlebars/runtime.js:handlebars',
          '../node_modules/rendr-handlebars/index.js:rendr-handlebars'
        ],
        aliasMappings: [
          {
            cwd: 'app/',
            src: ['**/*.js'],
            dest: 'app/'
          }
        ],
        shim: {
          jquery: {
            path: 'assets/vendor/jquery-1.9.1.min.js',
            exports: '$'
          }
        }
      },
      app: {
        src: [ 'app/**/*.js' ],
        dest: 'public/mergedAssets.js'
      },
      tests: {
        src: [
          'test/helper.js',
          'test/app/**/*.js'
        ],
        dest: 'public/testBundle.js'
      }
    },

    exec: {
      runNode: 'node index.js'
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('runNode', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['index.js'],
      opts: {
        stdio: 'inherit'
      }
    }, function () {
      grunt.fail.fatal(new Error("node quit"));
    });
  });


  grunt.registerTask('compile', ['handlebars', 'browserify']);

  // Run the server and watch for file changes
  grunt.registerTask('server', ['compile', 'exec:runNode']);

  // Default task(s).
  grunt.registerTask('default', ['compile']);

};
