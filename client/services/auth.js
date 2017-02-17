(() => {
    'use strict';

    angular.module('rolliPolli')
        .service('auth', ['$window', function($window) {
            const self = this;

            self.saveToken = token => {
                $window.localStorage['jwt'] = token;
            };
        }]);
})();