(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('loginCtrl', ['$state', '$scope', '$location', 'api', 'auth', function($state, $scope, $location, api, auth) {
            const self = this;

            if (auth.isLoggedIn()) {
                $state.go('mypolls');
            }

            self.location = $location.path();

            self.login = function(username, password, e) {
                e.preventDefault();

                api.post('/login', {'username': username, 'password': password}).then(function success(response) {
                    auth.saveToken(response.data);
                    self.isLoggedIn = true;
                    $scope.$emit('login', self.isLoggedIn);
                    $state.go('mypolls');
                }, function error(err) {
                    alert('We couldn\'t log you in. Please check your connection and try again');
                });
            };
        }]);
})();