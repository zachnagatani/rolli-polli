(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('loginCtrl', ['$state', 'api', 'auth', function($state, api, auth) {
            const self = this;

            self.login = function(username, password, e) {
                e.preventDefault();

                api.post('http://localhost:8000/login', {'username': username, 'password': password}).then(function success(response) {
                    auth.saveToken(response.data);
                    $state.go('mypolls');
                }, function error(err) {
                    console.log(err);
                });
            };
        }]);
})();