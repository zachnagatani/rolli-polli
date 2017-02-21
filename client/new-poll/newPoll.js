(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('newPollCtrl', ['$location', 'api', 'auth', function($location, api, auth) {
            const self = this;

            self.location = $location.path();

            self.getNumber = num => {
                return new Array(num);
            };

            self.postPoll = (question, optionsNumber, e) => {
                e.preventDefault();
                const form = document.getElementById('poll-form');

                let counter = 1,
                    options = [];
                while (counter <= optionsNumber) {
                    console.log(form.elements['option' + counter].value);
                    options.push({name: form.elements['option' + counter].value});
                    counter++;
                }

                api.post('http://localhost:8000/new-poll', {
                    username: auth.currentUser().username,
                    question: question,
                    options: options
                }).then(function sucess(response) {
                    console.log(response.data);
                }, function error(err) {
                    console.log(err);
                });
            };
        }]);
})();