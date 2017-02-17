(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('viewPollCtrl', ['api', 'auth', function(api, auth) {
            const self = this;

            self.calcVotes = poll => {
                let votes = 0;
                poll.options.forEach(option => {
                    votes += option.votes;
                });

                return votes;
            };

            // api.get('http://localhost:8000/view-polls').then(function(response) {
            //     console.log(response.data);
            //     self.polls = response.data;
            // });
        }]);
})();