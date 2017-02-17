(() => {
    'use strict';

    angular.module('rolliPolli')
        .service('api', ['$http', function($http) {
            const self = this;

            self.get = (url, config) => {
                return $http.get(url, config);
            }
        }]);
})();