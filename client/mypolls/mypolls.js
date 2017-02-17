(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('myPollsCtrl', ['api', function(api) {
            const self = this;

            // api.get('http://localhost:8000/profile', {
            //     headers: {
            //         Authorization: 'Bearer ' + token
            //     }
            // }).then(function(response) {
            //     self.profile = response.data;
            //     console.log(response);
            // });
        }]);
})();