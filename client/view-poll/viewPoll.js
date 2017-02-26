(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('viewPollCtrl', ['$state', '$stateParams', '$timeout', 'api', 'auth', function($state, $stateParams, $timeout, api, auth) {
            const self = this;

            self.vote = null;
            self.voted = false;
            self.token = auth.getToken();
            if (auth.isLoggedIn()) {
                self.username = auth.currentUser().username;
            }

            self.userVote = () => {
                api.post('/update-poll/' + $stateParams.id, {
                    options: self.poll.options,
                    voter: self.username
                }, {
                    headers: {
                        Authorization: 'Bearer ' + self.token
                    }
                }).then(function(response) {
                    console.log(response.data);
                    self.updateGraph(response.data.options);
                    self.voted = true;
                });
            };

            self.nonUserVote = () => {
                api.post('/update-poll/' + $stateParams.id, {
                    options: self.poll.options,
                }).then(function(response) {
                    console.log(response.data);
                    self.updateGraph(response.data.options);
                    self.voted = true;
                });
            };

            self.buildGraph = (data) => {
                const padding = 50,
                      svgHeight = 500 - padding,
                      svgWidth = $('svg').width() - padding,
                      labelOffset = 5,
                      xScale = d3.scaleLinear()
                        .domain([0, d3.max(data, d => { return d.votes })])
                        .range([padding, svgWidth]),
                      yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, d => { return d.votes })])
                        .range([0, svgHeight]),
                      yAxisScale = d3.scaleLinear()
                        .domain([0, d3.max(data, d => { return d.votes })])
                        .range([svgHeight, 0]),
                      yAxis = d3.axisLeft(yAxisScale),
                      svg = d3.select('.graph');

                svg.selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('fill', '#1976D2')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', '2px')
                    .attr('x', (d, i) => {
                        return svgWidth/data.length * i + padding;
                    })
                    .attr('width', (d, i) => {
                        return svgWidth/data.length;
                    })
                    .attr('y', d => {
                        return svgHeight - yScale(d.votes) + padding/2;
                    })
                    .attr('height', (d, i) => {
                        return yScale(d.votes);
                    });

                svg.selectAll('text')
                    .data(data)
                    .enter()
                    .append('text')
                    .attr('x', (d, i) => {
                        return svgWidth/data.length * i + padding + labelOffset;
                    })
                    .attr('y', d => {
                        return svgHeight + padding - labelOffset;
                    })
                    .text(d => {
                        return d.name + ': ' + d.votes;
                    });

                svg.append('g')
                    .attr('transform', 'translate(50, 25)')
                    .call(yAxis);
            };

            self.updateGraph = data => {
                const padding = 50,
                      svgHeight = 500 - padding,
                      svgWidth = $('svg').width() - padding,
                      labelOffset = 5,
                      xScale = d3.scaleLinear()
                        .domain([0, d3.max(data, d => { return d.votes })])
                        .range([padding, svgWidth]),
                      yScale = d3.scaleLinear()
                        .domain([0, d3.max(data, d => { return d.votes })])
                        .range([0, svgHeight]),
                      yAxisScale = d3.scaleLinear()
                        .domain([0, d3.max(data, d => { return d.votes })])
                        .range([svgHeight, 0]),
                      yAxis = d3.axisLeft(yAxisScale),
                      svg = d3.select('.graph');

                svg.selectAll('rect')
                    .data(data)
                    .transition()
                    .attr('y', d => {
                        return svgHeight - yScale(d.votes) + padding/2;
                    })
                    .attr('height', (d, i) => {
                        return yScale(d.votes);
                    });

                svg.selectAll('text')
                    .data(data)
                    .text(d => {
                        return d.name + ': ' + d.votes;
                    });

                svg.select('g')
                    .call(yAxis);
            };

            self.calcVotes = poll => {
                let votes = 0;
                poll.options.forEach(option => {
                    votes += option.votes;
                });

                return votes;
            };

            /** TODO: Don't want to manip dom here? And we are getting $apply already in progress error... */
            self.clickRadio = (id) => {
                if (self.vote === 'newOption') {
                    self.addNewOption = false;
                }
                document.getElementById(id).click();
            };

            self.castVote = (vote, e) => {
                e.preventDefault();

                // Grab the radio buttons on the page, convert them to an Array
                // grab the selected button, its index, and corresponding option object
                // in self.poll
                const radios = document.getElementsByName('vote'),
                      radiosArr = Array.prototype.slice.call(radios),
                      selected = radiosArr.filter(obj => {
                        return obj.value === vote;
                      })[0],
                      indexOfSelected = radiosArr.indexOf(selected),
                      selectedOptionObj = self.poll.options.filter(option => {
                          return option.name === vote;
                      })[0];

                // Handler for if a new option is added
                if (selected.value === 'newOption') {
                    if (!self.newOption) {
                        alert('Your new option cannot be empty.');
                        return;
                    }

                    self.poll.options.push({
                        name: self.newOption,
                        votes: 1
                    });

                    if(auth.isLoggedIn()) {
                        self.userVote();
                    } else {
                        self.nonUserVote();
                    }
                }

                // Increment vote
                selectedOptionObj.votes += 1;
                // Update options
                self.poll.options[indexOfSelected] = selectedOptionObj;

                // Cast vote
                if(auth.isLoggedIn()) {
                    self.userVote();
                } else {
                    self.nonUserVote();
                }
            };

            self.deletePoll = (id) => {
                const URL = '/delete-poll/' + id;

                $('#confirmation-dialogue').modal('hide');

                $timeout(() => {
                    api.delete(URL, {
                        headers: {
                            Authorization: 'Bearer ' + self.token
                        }
                    }).then(function(response) {
                        $state.go('mypolls');
                    }).catch(function(response) {
                        alert('We couldn\'t delete your poll. Please try again.');
                    });
                }, 1000);
            };

            api.get('/view-poll/' + $stateParams.id).then(function(response) {
                console.log(response.data);
                self.poll = response.data;
                self.buildGraph(self.poll.options);
                if (self.poll.voters.includes(self.username)) {
                    self.voted = true;
                }
            }).catch(function(err) {
                console.log('We couldn\'t access this poll. Please check your connection and try again.');
            });
        }]);
})();