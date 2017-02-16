(() => {
    'use strict';

    const app = angular.module('rolliPolli', ['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home',  {
                url: '/home',
                templateUrl: 'home/home.html',
                controller: 'homeCtrl as vm'
            });

        $urlRouterProvider
            .otherwise('/home');
    }]);

    app.controller('mainCtrl', function() {
        const self = this;

        this.name = "Rolli Polli";
    });
})();