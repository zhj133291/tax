({
    appDir: './',
    baseUrl: './',
    dir: './dist',
    modules: [
        {
            name: 'main'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    //重点设置，防止压缩后变量名报错
    removeCombined: true,
    optimize: "uglify",
    uglify: {
        mangle: false  //false 不混淆变量名
    },
    optimizeCss: 'standard',
    findNestedDependencies: true,
    //
    paths:{
      "angular": "lib/js/angular",
      "ui.router": "lib/js/angular-ui-router",
      "jquery": "lib/js/jquery-2.1.1",
      "highcharts": "lib/js/highcharts",
      "exporting": "lib/js/exporting",
      "data": "lib/js/data",
      "highcharts-zh_CN": "lib/js/highcharts-zh_CN",
      "series-label": "lib/js/series-label",
      "oldie": "lib/js/oldie",
      "amazeui.min": "lib/js/amazeui.min",
      "apps": "lib/js/apps",
      "controllers":"src/controllers",
      "services":"src/services",
      "directives":"src/directives",
      "app":"./app"
    },
    //shim:是配置不兼容的模块。
    shim : {
        "angular" : {
            exports : "angular"
        },
        "ui.router":{deps:["angular"]},
      "app":{exports:"app"},
      "apps":{deps:["jquery","amazeui.min"]}
    },
})