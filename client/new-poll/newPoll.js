(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('newPollCtrl', ['$location', '$state', 'api', 'auth', function($location, $state, api, auth) {
            const self = this;

            self.location = $location.path();

            if (!auth.isLoggedIn()) {
                $state.go('login');
            }

            self.getNumber = num => {
                return new Array(num);
            };

            self.postPoll = (question, optionsNumber, e) => {
                e.preventDefault();
                const form = document.getElementById('poll-form');

                if (optionsNumber < 2) {
                    alert('You must have more than one option.');
                    return;
                }

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
                }, {
                    headers: {
                        Authorization: 'Bearer ' + auth.getToken()
                    }
                }).then(function sucess(response) {
                    $state.go('success', {'id': response.data._id, 'name': response.data.question});
                }, function error(err) {
                    console.log(err);
                    alert('There was an error submitting the poll. Please check your internet connection and try again.');
                });
            };
        }]);
})();