(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('signupCtrl', ['$state', '$scope', 'api', 'auth', function($state, $scope, api, auth) {
            const self = this;

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
                    console.log(err);
                });
            };
        }]);
})();