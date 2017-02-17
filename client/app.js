(() => {
    'use strict';

    const app = angular.module('rolliPolli', ['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',  {
                url: '/home',
                templateUrl: 'home/home.html',
                controller: 'homeCtrl as vm'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'signup/signup.html',
                controller: 'signupCtrl as vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller: 'loginCtrl as vm'
            })
            .state('mypolls', {
                url: '/mypolls',
                templateUrl: 'mypolls/mypolls.html',
                controller: 'myPollsCtrl as vm'
            });

        $urlRouterProvider
            .otherwise('/home');
    }]);

    app.controller('mainCtrl', ['$location', function($location) {
        const self = this;

        self.location = $location.path();
    }]);
})();