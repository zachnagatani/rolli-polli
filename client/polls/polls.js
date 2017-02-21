(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('pollsCtrl', ['api', 'auth', 'voteCalculator', function(api, auth, voteCalculator) {
            const self = this;

            self.calculateVotes = voteCalculator.calculateVotes;

            api.get('http://localhost:8000/get-polls').then(function(response) {
                console.log(response.data);
                self.polls = response.data;
            }).catch(function(err) {
                alert('We couldn\'t get the polls. Please check your connection and try again');
            });
        }]);
})();