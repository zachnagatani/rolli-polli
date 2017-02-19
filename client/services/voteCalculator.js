(() => {
    'use strict';

    angular.module('rolliPolli')
        .service('voteCalculator', [function() {
            const self = this;

            self.calculateVotes = poll => {
                let votes = 0;
                poll.options.forEach(option => {
                    votes += option.votes;
                });

                return votes;
            };
        }]);
})();