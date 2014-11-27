module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            global: {
                options: {
                    base: './',
                    port: 3000,
                    keepalive: true
                }
            }
        }
        ,uglify: {
            options: {
                mangle: true,
                banner: '/*!\nauthor: <%= pkg.author %> \ndate: <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            module:{
                files:[{
                    expand: true,
                    cwd: 'js/module/',
                    src: '**/*.js',
                    dest: 'js/dest/'//,
                    //ext: '.min.js'
                }]
            }
            ,libmin:{
                files:[{
                    expand: true,
                    cwd: 'js/lib/',
                    src: '**/*.js',
                    dest: 'js/dest/lib'
                    ,ext: '.min.js'
                }]
            }
        }
        ,
        less: {
            options: {
                compress: true,//false,
                yuicompress: true,//false,
                optimization: 2
            }
            ,app:{
                files:{
                    "css/style.css":"css/style.less"
                }
            }
        }
        ,requirejs: {
            compile: {
                options: {
                    baseUrl: "js/",
                    paths: {
                        "$":"./lib/zepto.min",
                        //"lazyload":"./module/lazyload/zepto.lazyload",
                        "Base": "./module/base"
                    },
                    shim: {
                        "$": {
                            exports: "$"
                        }
                    },
                    name: "app/app",
                    out: "js/build/app/app.js",
                    preserveLicenseComments: false
                }
            }
        }
        ,watch: {
            css: {
                files: 'css/style.less',
                tasks: ['less:app'],
                options: {
                    debounceDelay: 1000
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');
};