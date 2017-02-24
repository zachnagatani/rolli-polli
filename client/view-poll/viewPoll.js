(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('viewPollCtrl', ['$stateParams', 'api', 'auth', function($stateParams, api, auth) {
            const self = this;

            self.vote = null;
            self.voted = false;
            self.token = auth.getToken();
            if (auth.isLoggedIn()) {
                self.username = auth.currentUser().username;
            }

            self.userVote = () => {
                api.post('http://localhost:8000/update-poll/' + $stateParams.id, {
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
                api.post('http://localhost:8000/update-poll/' + $stateParams.id, {
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
                        // return svgHeight - labelOffset;
                        return svgHeight + padding - labelOffset;
                    })
                    .text(d => {
                        return d.name + ' ' + d.votes;
                    });

                svg.append('g')
                    .attr('transform', 'translate(50, 25)')
                    .call(yAxis);

                // svg.selectAll('text')
                //     .data(data)
                //     .enter()
                //     .append('text')
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

                if(auth.isLoggedIn()) {
                    self.userVote();
                } else {
                    self.nonUserVote();
                }
            };

            api.get('http://localhost:8000/view-poll/' + $stateParams.id).then(function(response) {
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