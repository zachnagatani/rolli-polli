(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('loginCtrl', ['$state', '$scope', 'api', 'auth', function($state, $scope, api, auth) {
            const self = this;

            self.login = function(username, password, e) {
                e.preventDefault();

                api.post('http://localhost:8000/login', {'username': username, 'password': password}).then(function success(response) {
                    auth.saveToken(response.data);
                    self.isLoggedIn = true;
                    $scope.$emit('login', self.isLoggedIn);
                    $state.go('mypolls');
                }, function error(err) {
                    console.log(err);
                });
            };
        }]);
})();