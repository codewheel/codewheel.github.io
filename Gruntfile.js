module.exports = function(grunt) {
  // Load all grunt tasks we have installed:
  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    watch: {
      scripts: {
        files: [
          '_site/assets/styles/app.css',
          '_site/assets/scripts/dist/app.js',
          '_site/**/*.html',
        ],
        options: {
          livereload: true,
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', 'watch');
};
