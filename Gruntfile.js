module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [["babelify", { "stage": 0 }]]
        },
        files: {
          "src/bundle.js": "build/script.js"
        }
      }
    },
    watch: {
      scripts: {
        files: ["build/*.js"],
        tasks: ["browserify"]
      },
      html:{
	      files:  'index.html', 
	      options:{
		      livereload: true
	      }
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["browserify", "watch"]);
};