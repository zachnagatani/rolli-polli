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
            .state('polls', {
                url: '/polls',
                templateUrl: 'polls/polls.html',
                controller: 'pollsCtrl as vm'
            })
            .state('view-poll', {
                url: '/view-poll/:id',
                templateUrl: 'view-poll/view-poll.html',
                controller: 'viewPollCtrl as vm'
            })
            .state('mypolls', {
                url: '/mypolls',
                templateUrl: 'mypolls/mypolls.html',
                controller: 'myPollsCtrl as vm'
            });

        $urlRouterProvider
            .otherwise('/home');
    }]);

    app.controller('mainCtrl', ['$location', '$rootScope', function($location, $rootScope) {
        const self = this;

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            self.location = $location.path();
        });
    }]);
})();