(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('myPollsCtrl', ['$state', 'api', 'auth', 'voteCalculator', function($state, api, auth, voteCalculator) {
            const self = this,
                  token = auth.getToken();

            if (!auth.isLoggedIn()) {
                $state.go('login');
            }

            self.calculateVotes = voteCalculator.calculateVotes;
            self.currentUser = auth.currentUser().username;

            if (!token) {
                $state.go('home');
            }
            api.get('http://localhost:8000/get-polls/' + self.currentUser, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(function(response) {
                self.polls = response.data;
            });
        }]);
})();