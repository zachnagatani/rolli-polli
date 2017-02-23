(() => {
    'use strict';

    angular.module('rolliPolli')
        .service('auth', ['$window', '$state', function($window, $state) {
            const self = this;

            self.saveToken = token => {
                $window.localStorage['jwt'] = token;
            };

            self.getToken = () => {
                return $window.localStorage['jwt'];
            };

			self.logout = function() {
				$window.localStorage.removeItem('jwt');
			};

            self.isLoggedIn = () => {
                const token = self.getToken();
                let payload;

                if (token) {
                    payload = JSON.parse($window.atob(token.split('.')[1]));
                    return payload.exp > Date.now() / 1000;
                }

                return false;
            };

            self.currentUser = () => {
                if (self.isLoggedIn()) {
                    const token = self.getToken(),
                          payload = JSON.parse($window.atob(token.split('.')[1]));

                    return {
                        username: payload.username
                    };
                }

                return;
            };
        }]);
})();