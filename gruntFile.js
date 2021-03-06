module.exports = function(grunt) {

	var initConfig;

	// Loading external tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma');


	/**
	 * Custom task to inline a generated file at a certain moment...
	 */
	grunt.registerTask('UGF', 'Use Generated Files.', function() {
		initConfig.meta.view.demoHTML = grunt.file.read(grunt.template.process("<%= tmp %>/demos.html"));
	});

	// Default task.
	grunt.registerTask('default', ['jshint', 'karma:unit']);
	grunt.registerTask('build', ['concat:tmp', 'concat:modules', 'clean:rm_tmp', 'uglify']);
	grunt.registerTask('build-doc', ['build', 'concat:html_doc', 'UGF', 'clean:rm_tmp', 'copy']);
	grunt.registerTask('server', ['karma:start']);


	var testConfig = function(configFile, customOptions) {
		var options = {
			configFile: configFile,
			singleRun: true
		};
		var travisOptions = process.env.TRAVIS && {
			browsers: ['Firefox', 'PhantomJS'],
			reporters: ['dots']
		};
		return grunt.util._.extend(options, customOptions, travisOptions);
	};

	// Project configuration.
	initConfig = {
		demo: 'demo',
		tmp: 'demo/tmp',
		dist: 'demo/out',
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: ['/**',
				' * <%= pkg.name %> - <%= pkg.description %>',
				' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
				' * @link <%= pkg.homepage %>',
				' * @license <%= pkg.license %>',
				' */',
				''
			].join('\n'),
			view: {
				humaName: "Input Directives",
				orgName: "thetrevdev",
				repoName: "input-directives",
				js: [
					'build/<%= meta.view.repoName %>.js'
				]
			},
			destName: '<%= dist %>/build/<%= meta.view.repoName %>'
		},
		watch: {
			karma: {
				files: ['modules/**/*.js'],
				tasks: ['karma:unit:run'] //NOTE the :run flag
			}
		},
		karma: {
			unit: testConfig('test/karma.conf.js'),
			start: {
				configFile: 'test/karma.conf.js'
			}
		},
		concat: {
			html_doc: {
				options: {
					banner: ['<!-- Le content - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
						'================================================== -->',
						'<div id="input-directives" ng-app="doc.input-directives">', ''
					].join('\n  '),
					footer: '</div>'
				},
				src: ['modules/**/demo/index.html'],
				dest: '<%= tmp %>/demos.html'
			},
			tmp: {
				files: {
					'<%= tmp %>/dep.js': ['modules/**/*.js', '!modules/input-directives.js', '!modules/ie-shiv/*.js', '!modules/**/test/*.js']
				}
			},
			modules: {
				options: {
					banner: '<%= meta.banner %>'
				},
				files: {
					'<%= meta.destName %>.js': ['<%= tmp %>/dep.js', 'modules/input-directives.js'],
					'<%= meta.destName %>-ieshiv.js': ['modules/ie-shiv/*.js']
				}
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			build: {
				files: {
					'<%= meta.destName %>.min.js': ['<%= meta.destName %>.js'],
					'<%= meta.destName %>-ieshiv.min.js': ['<%= meta.destName %>-ieshiv.js']
				}
			}
		},
		clean: {
			rm_tmp: {
				src: ['<%= tmp %>']
			}
		},
		jshint: {
			files: ['modules/**/*.js', 'gruntFile.js', 'test/**/*Spec.js', 'demo/demo.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true,
				indent: true,
				globals: {}
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: '<%= demo %>/',
					src: ['**', '!.**', '!out/**'],
					dest: '<%= dist %>/'
				}]
			},
			template: {
				options: {
					processContent: function(content) {
						return grunt.template.process(content);
					}
				},
				files: [{
					src: ['<%= demo %>/.tmpl/index.tmpl'],
					dest: '<%= dist %>/index.html'
				}]
			}
		}
	};
	grunt.initConfig(initConfig);

};