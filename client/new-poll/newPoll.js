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

                console.log(optionsNumber);

                if (!question) {
                    alert('You must enter a question.');
                    return;
                }

                if (!optionsNumber || optionsNumber < 2) {
                    alert('You must have more than one option.');
                    return;
                }

                let counter = 1,
                    options = [];

                while (counter <= optionsNumber) {
                    console.log(form.elements['option' + counter].value);
                    if (!form.elements['option' + counter].value) {
                        alert('Options cannot be left blank.');
                        form.elements['option' + counter].focus();
                        return;
                    }

                    options.push({name: form.elements['option' + counter].value});
                    counter++;
                }

                api.post('/new-poll', {
                    username: auth.currentUser().username,
                    question: question,
                    options: options
                }, {
                    headers: {
                        Authorization: 'Bearer ' + auth.getToken()
                    }
                }).then(function success(response) {
                    $state.go('success', {'id': response.data._id, 'name': response.data.question});
                }, function error(err) {
                    console.log(err);
                    alert('There was an error submitting the poll. Please check your internet connection and try again.');
                });
            };
        }]);
})();