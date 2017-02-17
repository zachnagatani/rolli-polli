(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('loginCtrl', ['$http', '$state', 'auth', function($http, $state, auth) {
            const self = this;

            self.login = function(username, password, e) {
                e.preventDefault();

                $http.post('http://localhost:8000/login', {'withCredentials': true, 'username': username, 'password': password}).then(function success(response) {
                    console.log(response.data);
                    auth.saveToken(response.data);
                }, function error(err) {
                    console.log(err);
                });
            };
        }]);
})();