(() => {
    'use strict';

    const app = angular.module('rolliPolli', ['ui.router']);

    app.config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlMatcherFactoryProvider,$urlRouterProvider) {
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
            })
            .state('success', {
                url: '/success/:id',
                templateUrl: 'success/success.html',
                controller: 'successCtrl as vm',
                params: {
                    name: null
                }
            });

            // TODO: FIGURE OUT HTMLW5 MODE workaround for adding trailing slashes breaking routes
        // $locationProvider.html5Mode(true);

        // $urlMatcherFactoryProvider.strictMode(false);

        $urlRouterProvider
            .otherwise('/home');
    }]);

    app.controller('mainCtrl', ['$location', '$rootScope', '$scope', '$state', 'auth', function($location, $rootScope, $scope, $state, auth) {
        const self = this;

        self.isLoggedIn = auth.isLoggedIn();
        self.logout = () => {
            auth.logout();
            self.isLoggedIn = false;
            $state.go('login');
        };

        $scope.$on('login', function(event, loggedIn) {
            self.isLoggedIn = loggedIn;
        });

        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            self.location = $location.path();
            console.log(self.location);
        });
    }]);

})();