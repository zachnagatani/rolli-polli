(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('viewPollCtrl', ['$stateParams', 'api', 'auth', function($stateParams, api, auth) {
            const self = this;

            self.vote = null;
            self.token = auth.getToken();

            self.buildGraph = (data) => {
                const svgHeight = 500,
                      multiplier = 30;
                d3.select('.graph')
                    .selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('x', (d, i) => {
                        return i * multiplier;
                    })
                    .attr('y', d => {
                        return svgHeight - multiplier * d.votes;
                    })
                    .attr('width', 30)
                    .attr('height', (d, i) => {
                        return d.votes * multiplier;
                    })
                    .attr('fill', '#fff')
                    .attr('stroke', '#1976D2')
                    .attr('stroke-width', '2px');

                d3.select('.graph')
                    .selectAll('text')
                    .data(data)
                    .enter()
                    .append('text')
                    .attr('x', (d, i) => {
                        return i * multiplier;
                    })
                    .attr('y', d => {
                        return svgHeight - multiplier * d.votes - 3;
                    })
                    .text(d => {
                        return d.name;
                    });
            };

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

                self.buildGraph(self.poll.options);
            }).catch(function(err) {
                alert('We couldn\'t access this poll. Please check your connection and try again.');
            });
        }]);
})();