(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('signupCtrl', ['$state', '$scope', '$location', 'api', 'auth', function($state, $scope, $location, api, auth) {
            const self = this;

            if (auth.isLoggedIn()) {
                $state.go('mypolls');
            }

            self.location = $location.path();

            self.signup = function(username, email, password, verify, e) {
                e.preventDefault();

                api.post('http://localhost:8000/signup', {
                    'username': username,
                    'email': email,
                    'password': password,
                    'verify': verify
                }).then(function success(response) {
                    auth.saveToken(response.data);
                    self.isLoggedIn = true;
                    $scope.$emit('login', self.isLoggedIn);
                    $state.go('mypolls');
                }, function error(err) {
                    alert('We couldn\'t get you signed up. Please check your internet connection and try again.');
                });
            };
        }]);
})();