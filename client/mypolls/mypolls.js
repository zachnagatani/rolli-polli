(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('myPollsCtrl', ['$state', 'api', 'auth', 'voteCalculator', function($state, api, auth, voteCalculator) {
            const self = this,
                  token = auth.getToken();

            self.calculateVotes = voteCalculator.calculateVotes;

            if (!token) {
                $state.go('home');
            }
            api.get('http://localhost:8000/get-polls/znagatani', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(function(response) {
                self.polls = response.data;
            });
        }]);
})();