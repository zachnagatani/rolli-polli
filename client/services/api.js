(() => {
    'use strict';

    angular.module('rolliPolli')
        .service('api', ['$http', function($http) {
            const self = this;

            self.get = (url, config) => {
                return $http.get(url, config);
            };

            self.post = (url, body, config) => {
                return $http.post(url, body, config);
            };

            self.delete = (url, config) => {
                return $http.delete(url, config);
            };
        }]);
})();