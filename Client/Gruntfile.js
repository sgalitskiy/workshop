module.exports = function(grunt) {

    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "public/js",
                    mainConfigFile: "public/js/main.js",
                    include: ['main'], // Include the main module defined
                    insertRequire: ['main'], // Add a require step in at the end for the main module.
                    wrap: true, // Wrap everything up in a closure
                    generateSourceMaps: true, // Experimental
                    preserveLicenseComments: false, // Needs turned off for generateSourceMaps
                    optimize: "uglify", // Supports generateSourceMaps
                    out: "public/js/package.js"
                }
            }
        },

        jshint: {
            options: {
                browser: true,
                globals: {
                    requirejs: true,
                    console: true
                }
            },
            all: ['public/js/**/*.js', '!public/js/Templates/**']
        },

        sprite:{
            all: {
                src: 'public/images/sprite/*.png',
                dest: 'public/images/sprite.png',
                destCss: 'public/theme/default/css/sprite.css',
                padding: 20
              }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-spritesmith');


    grunt.registerTask('check_error', ['jshint']);
    //grunt.registerTask('styles', ['less']);
    grunt.registerTask('package', ['check_error', 'requirejs']);
    //grunt.registerTask('sprite', ['sprite']);
};