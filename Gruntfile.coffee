module.exports = (grunt) ->

  # Project configuration
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    less:
      compile:
        files:
          'css/day1.css': 'less/day1.less'
          'css/day2.css': 'less/day2.less'
          'css/day3.css': 'less/day3.less'
    cssmin:
      compile:
        files:
          'css/day1.min.css': 'css/day1.css'
          'css/day2.min.css': 'css/day2.css'
          'css/day3.min.css': 'css/day3.css'
    watch:
      less:
        files: 'less/*.less'
        tasks: ['less:compile', 'cssmin']
  )

  # Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  # Default tasks
  grunt.registerTask('default', ['less:compile', 'cssmin', 'watch'])
