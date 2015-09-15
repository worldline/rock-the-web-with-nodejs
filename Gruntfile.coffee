module.exports = (grunt) ->

  lessSource = 'less'
  cssDest = 'css'
  fontDest = "#{cssDest}/fonts"

  conf =
    pkg: grunt.file.readJSON('package.json')
    less:
      compile:
        files: {}
    cssmin:
      compile:
        files: {}
    'local-googlefont':
      comfortaa:
        options:
          family: 'Comfortaa'
          sizes: [300,400,700]
          cssDestination: cssDest
          fontDestination: fontDest
          fontBaseDir: cssDest
      fredericka:
        options:
          family: 'Fredericka the Great'
          sizes: [400]
          cssDestination: cssDest
          fontDestination: fontDest
          fontBaseDir: cssDest
    remove:
      build:
        dirList: cssDest
      dev:
        fileList: []
    watch:
      less:
        files: "#{lessSource}/*.less"
        tasks: ['less:compile', 'cssmin']

  for file in ['day1', 'day2', 'day3']
    conf.less.compile.files["#{cssDest}/#{file}.css"] = "#{lessSource}/#{file}.less"
    conf.cssmin.compile.files["#{cssDest}/#{file}.min.css"] = "#{cssDest}/#{file}.css"
    conf.remove.dev.fileList.push("#{cssDest}/#{file}.css")

  # Project configuration
  grunt.initConfig(conf)

  # Load plugins
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-local-googlefont')
  grunt.loadNpmTasks('grunt-rename')
  grunt.loadNpmTasks('grunt-remove')

  # Make a zip with needed files
  grunt.registerTask('dist', ['remove', 'less:compile', 'cssmin', 'remove:dev'])

  # Default tasks
  grunt.registerTask('default', ['remove', 'less:compile', 'cssmin', 'watch'])
