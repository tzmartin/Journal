var path = require("path");

/*

Install GitBook on Github Pages..

$ npm install .

Testing:

$ grunt test

Publish on the gh-pages branch: 

$ grunt publish

*/

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-gitbook');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-http-server');

    grunt.initConfig({
        'gitbook': {
            development: {
                input: "./",
                title: "TZ Martin Dev Journal",
                description: "This is my development journal.",
                github: "tzmartin/Journal",
                plugins: [
                    "anchors",
                    "customtheme",
                    "mermaid",
                    "js-sequence-diagram"
                ],
                pluginsConfig: {
                    "customtheme": {
                        "css": [
                            "../_/css/app.css"
                        ],
                        "js": [
                            "../_/js/app.js"
                        ]
                    }
                }
            }
        },
        'gh-pages': {
            options: {
                base: '_book'
            },
            src: ['**']
        },
        'clean': {
            files: '_book'
        },
        'http-server': {
            'dev': {
                // the server root directory
                root: '_book',

                port: 4000,
                host: "127.0.0.1",

                showDir : true,
                autoIndex: true,
                defaultExt: "html",

                //wait or not for the process to finish
                runInBackground: false
            }
        }
    });

    grunt.registerTask('test', [
        'gitbook',
        'http-server'
    ]);
    grunt.registerTask('publish', [
        'gitbook',
        'gh-pages',
        'clean'
    ]);
    grunt.registerTask('default', 'gitbook');
};
