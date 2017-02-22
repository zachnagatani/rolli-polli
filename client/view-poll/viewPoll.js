(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('viewPollCtrl', ['$stateParams', 'api', 'auth', function($stateParams, api, auth) {
            const self = this;

            self.vote = null;
            self.token = auth.getToken();

            self.calcVotes = poll => {
                let votes = 0;
                poll.options.forEach(option => {
                    votes += option.votes;
                });

                return votes;
            };

            /** TODO: Don't want to manip dom here? And we are getting $apply already in progress error... */
            self.clickRadio = id => {
                document.getElementById(id).click();
            };

            self.castVote = (vote, e) => {
                e.preventDefault();

                const radios = document.getElementsByName('vote'),
                      radiosArr = Array.prototype.slice.call(radios),
                      selected = radiosArr.filter(obj => {
                        return obj.value === vote;
                      })[0],
                      indexOfSelected = radiosArr.indexOf(selected[0]),
                      selectedOptionObj = self.poll.options.filter(option => {
                          return option.name === vote;
                      })[0];

                console.log(selected.value);
                console.log(radiosArr.indexOf(selected));
                console.log(selectedOptionObj);
                selectedOptionObj.votes += 1;
                console.log(selectedOptionObj);
                self.poll.options[indexOfSelected] = selectedOptionObj;
                console.log(self.poll.options);

                api.post('http://localhost:8000/update-poll/' + $stateParams.id, {
                    options: self.poll.options
                }).then(function(response) {
                    console.log(response.data);
                });
            };

            api.get('http://localhost:8000/view-poll/' + $stateParams.id).then(function(response) {
                console.log(response.data);
                self.poll = response.data;
            }).catch(function(err) {
                alert('We couldn\'t access this poll. Please check your connection and try again.');
            });
        }]);
})();