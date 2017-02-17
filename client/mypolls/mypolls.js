(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('myPollsCtrl', ['api', 'auth', function(api, auth) {
            const self = this,
                  token = auth.getToken();

            api.get('http://localhost:8000/get-polls/' + auth.currentUser().username, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(function(response) {
                // self.profile = response.data;
                console.log(response.data);
            });
        }]);
})();