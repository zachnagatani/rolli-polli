(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('newPollCtrl', ['api', function(api) {
            const self = this;

            self.getNumber = num => {
                return new Array(num);
            };
        }]);
})();