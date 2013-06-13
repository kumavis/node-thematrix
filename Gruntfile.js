'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    moreshell: {
      mocha: {
        command: {
          name: 'mocha',
          options: {
            compilers: 'coffee:coffee-script',
            reporter: 'Nyan'
          },
          args: ['test/test_helper.coffee', 'test/**/*_test.coffee']
        },
        options: {
          stdout: true,
          failOnError: true
        }
      }
    },
    coffee: {
      lib: {
        options: {
          bare: true,
          join: true
        },
        files: {
          'lib/thematrix.js': ['src/thematrix_aspect.coffee'],
        }
      },
      bin: {
        options: {
          bare: true,
          join: true
        },
        files: {
          'bin/thematrix': ['src/thematrix_cli.coffee']
        }
      },

    },
    usebanner: {
      shebang: {
        options: {
          position: 'top',
          banner: '#!/usr/bin/env node'
        },
        files: {
          src: ['bin/thematrix']
        }
      }
    },
    watch: {
      src: {
        files: ['src/**/*.coffee'],
        tasks: ['test', 'compile']
      },
      test: {
        files: ['test/test_helper.coffee', 'test/**/*_test.coffee'],
        tasks: ['test']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-moreshell');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //Aliases
  grunt.registerTask('test', ['moreshell:mocha']);
  grunt.registerTask('compile', ['coffee','usebanner']);

  // Default task.
  grunt.registerTask('default', ['test', 'compile']);

};
