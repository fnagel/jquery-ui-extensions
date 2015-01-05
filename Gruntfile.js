module.exports = function (grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON("package.json"),
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						"dist",
						"*.zip",
						"*.tgz"
					]
				}]
			}
		},
		concat : {
			options : {
				separator : ";",
				banner : "/*! v<%= pkg.version %> - <%= grunt.template.today('dd-mm-yyyy HH:MM') %> */\n"
			},
			dist : {
				src : ["selectmenu/**/*.js"],
				dest : "dist/<%= pkg.name %>-<%= pkg.version %>.js"
			}
		},
		uglify : {
			options: {
				report: "min",
				preserveComments : "some"

			},
			dist : {
				files : {
					"dist/<%= pkg.name %>-<%= pkg.version %>.min.js" : ["<%= concat.dist.dest %>"]
				}
			}
		},
		jshint : {
			files : ["gruntfile.js", "selectmenu/**/*.js"],
			options : {
				"boss": true,
				"curly": true,
				"eqeqeq": true,
				"eqnull": true,
				"expr": true,
				"immed": true,
				"noarg": true,
				"onevar": true,
				"quotmark": "double",
				"smarttabs": true,
				"trailing": true,
				"undef": true,
				"unused": true,
				"node": true,
				"browser": true,
				"globals": {
					"jQuery": true,
					"define": true
				}
			}
		},
		jscs: {
			files : ["gruntfile.js", "selectmenu/**/*.js"]
		},
		compress: {
			main: {
				options: {
					archive: "<%= pkg.name %>-<%= pkg.version %>.zip"
				},
				files: [
					{ src: ["./**", "!./node_modules/**", "!./*.zip"], dest: "<%= pkg.name %>-<%= pkg.version %>/" }
				]
			}
		},
		watch : {
			files : ["<%= jshint.files %>"],
			tasks : ["jshint"]
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-compress");

	grunt.registerTask("test", ["jshint", "jscs"]);

	grunt.registerTask("default", ["clean", "jshint", "concat", "uglify", "compress"]);

};