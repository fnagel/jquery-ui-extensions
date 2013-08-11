module.exports = function (grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		concat : {
			options : {
				separator : ';',
				banner : '/*! v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy HH:MM") %> */\n'
			},
			dist : {
				src : ['dialog/**/*.js'],
				dest : 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
			}
		},
		uglify : {
			options: {
				report: 'min',
				preserveComments : 'some'
				
			},
			dist : {
				files : {
					'dist/<%= pkg.name %>-<%= pkg.version %>.min.js' : ['<%= concat.dist.dest %>']
				}
			}
		},
		jshint : {	
			files : ['gruntfile.js', 'dialog/**/*.js'],
			options : {
				globals : {
					jQuery : true
				}
			}
		},
		compress: {
			main: {
				options: {
					archive: '<%= pkg.name %>-<%= pkg.version %>.zip'
				},
				files: [
					{ src: ['./**', '!./node_modules/**', '!./*.zip'], dest: '<%= pkg.name %>-<%= pkg.version %>/' }
				]
			}
		},
		watch : {
			files : ['<%= jshint.files %>'],
			tasks : ['jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('test', ['jshint']);

	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compress']);

};