(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('myPollsCtrl', ['$state', 'api', 'auth', function($state, api, auth) {
            const self = this,
                  token = auth.getToken();

            if (!token) {
                $state.go('home');
            }
            api.get('http://localhost:8000/get-polls/znagatani', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(function(response) {
                // self.profile = response.data;
                console.log(response.data);
            });
        }]);
})();