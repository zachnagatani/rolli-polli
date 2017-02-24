(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('successCtrl', ['$stateParams', '$window', '$location', function($stateParams, $window, $location) {
            const self = this;

            self.pollName = $stateParams.name;
            self.url = new $window.URL($location.absUrl());
            self.pollUrl = self.url.origin + '/#!/view-poll/' + $stateParams.id;
            self.pollHref = '#!/view-poll/' + $stateParams.id;
            console.log(self.pollurl);
        }]);
})();