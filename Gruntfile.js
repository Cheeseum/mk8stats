/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' License: <%= pkg.license %> */\n',
    // Task configuration.
    copy: {
        dist: {
            files: [
                { expand: true, src : 'app/data/*.json', dest: 'dist/data/', flatten: true },
                { expand: true, src : 'app/js/lib/*.js', dest: 'dist/js/lib/', flatten: true },
                { expand: true, src : 'app/partials/*.html', dest: 'dist/partials/', flatten: true }
            ]
        }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['app/js/*.js'],
        dest: 'build/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    sass: {
        compile: {
            files: {
                'app/css/style.css': 'sass/style.scss'
            }
        }
    },
    cssmin: {
        options: {
            banner: '<%= banner %>'
        },
        dist: {
            src: 'app/css/*.css',
            dest: 'dist/css/style.min.css'
        }
    },
    processhtml: {
        dist: {
            files: {
                'dist/index.html': 'app/index.html'
            }
        }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('build', ['jshint', 'sass']);
  grunt.registerTask('dist', ['build', 'concat', 'uglify', 'cssmin', 'processhtml', 'copy:dist']);
  grunt.registerTask('default', ['watch']);
};
