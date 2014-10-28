module.exports = function(grunt){
    grunt.initConfig({
        concurrent: {
          dev: {
            tasks: ['nodemon', 'watch'],
            options: {
              logConcurrentOutput: true
            }
          }
        },
        nodemon: {
            all: {
                script: 'server.js',
                options: {
                    watchedExtensions: ['js', 'html', 'css'],
                    env: {
                       PORT: '1337'
                    },
                    callback: function (nodemon) {
                        nodemon.on('restart', function() {
                            // Delay before listening on server
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                    },
                }
            }
        },
        watch: {
          all: {
            files: ['.rebooted', 'views/**/*.html', 'public/css/*.less'],
            options: {
              livereload: true
            }
          } 
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-inject');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('serve', ['concurrent:dev']);
};