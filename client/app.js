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
            })
            .state('new-poll', {
                url: '/new-poll',
                templateUrl: 'new-poll/new-poll.html',
                controller: 'newPollCtrl as vm'
            });

        $urlRouterProvider
            .otherwise('/home');
    }]);

    app.controller('mainCtrl', ['$location', '$rootScope', '$scope', 'auth', function($location, $rootScope, $scope, auth) {
        const self = this;

        self.isLoggedIn = auth.isLoggedIn();
        self.logout = () => {
            auth.logout();
            self.isLoggedIn = false;
        };

        $scope.$on('login', function(event, loggedIn) {
            self.isLoggedIn = loggedIn;
            console.log(loggedIn);
        });

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            self.location = $location.path();
            console.log(self.location);
        });
    }]);

})();