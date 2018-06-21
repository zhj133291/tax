//config配置模块

require.config({
//baseUrl:用来指定加载模块的目录
//baseUrl:"js/injs",
//paths，是指定模块的加载路径。
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
  "amazeui.min":{deps:["jquery"]},
  "apps":{deps:["amazeui.min"]}
},

  //deps:用来指定依赖模块，requireJS会加载这个文件并执行。
  // deps : ['app']
});
// 启动angular
// define(["app"], function (app) {
//     //使用bootstrap方法启动Angular应用
//     angular.bootstrap(document, ['tax']);
//     require([
//       'app',
//       'controllers/indexCtrl',
//       'directives/ngRightClick',
//       'directives/ngScroll',
//       'directives/tm.pagination',
//       "services/params",
//     ], function(){
//     });
// });
require([
  'app',
  'controllers/indexCtrl',
  'directives/ngRightClick',
  'directives/ngScroll',
  'directives/resize',
  'directives/tm.pagination',
  "services/params",
], function(){
  angular.bootstrap(document, ['tax']);
});