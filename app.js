define(['angular',
        'ui.router',
        'jquery',
        'ui.router',
        "amazeui.min",
        "apps",
        'services/httpService',
        'services/vilidateService',
        'services/wordsService'], function () {
    var app = angular.module('tax', [
        'ui.router'
    ]);

    // 用于在bootstrap之后仍然可以进行注册，实现懒加载
    app.config([
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.provider = $provide.provider;
            app.value = $provide.value;
            app.constant = $provide.constant;
            app.decorator = $provide.decorator;
        }
    ]);
    var lazy = function (u, t, c, r) {
        return {
            url: u,
            templateUrl: t,
            controller: c,
            //懒加载
            resolve: {
                deps: ['$q', '$rootScope', function ($q, $rootScope) {
                    var deferred = $q.defer();
                    require([
                        r
                    ], function () {
                        $rootScope.$apply(deferred.resolve);
                    });
                    return deferred.promise;
                }]
            },
            cache: false
        }
    }
    app.config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('login', lazy('/login', 'src/views/login.html', 'loginCtrl', 'src/controllers/loginCtrl'))
                .state('home', lazy('/home', 'src/views/home.html', 'homeCtrl', 'src/controllers/homeCtrl'))
                .state('home.homeIndex', lazy('/homeIndex', 'src/views/homeIndex.html', 'homeIndexCtrl', 'src/controllers/homeIndexCtrl'))
                .state('home.account', lazy('/account', 'src/views/account.html', 'accountCtrl', 'src/controllers/accountCtrl'))
                .state('home.organization', lazy('/organization', 'src/views/organization.html', 'organizationCtrl', 'src/controllers/organizationCtrl'))
                .state('home.taxpayer', lazy('/taxpayer', 'src/views/taxpayer.html', 'taxpayerCtrl', 'src/controllers/taxpayerCtrl'))
                .state('home.formalInterview', lazy('/formalInterview', 'src/views/formalInterview.html', 'formalInterviewCtrl', 'src/controllers/formalInterviewCtrl'))
                .state('home.formalInfo', lazy('/formalInfo', 'src/views/formalInfo.html', 'formalInfoCtrl', 'src/controllers/formalInfoCtrl'))
                .state('home.roleAuth', lazy('/roleAuth', 'src/views/roleAuth.html', 'roleAuthCtrl', 'src/controllers/roleAuthCtrl'))
                .state('home.sysLog', lazy('/sysLog', 'src/views/log.html', 'logCtrl', 'src/controllers/logCtrl'))
        }
    ]);
    // 在这里需要将 app 返回, 才能保证在其它地方, define(['app'], factory) 的时候, factory能够得到 app
    return app;
});