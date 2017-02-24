(() => {
    'use strict';

    angular.module('rolliPolli')
        .controller('successCtrl', ['$stateParams', function($stateParams) {
            const self = this;

            self.pollName = $stateParams.name;
            self.pollUrl = 'http://roli-polli.herokuapp.com/view-poll/' + $stateParams.id;
            self.pollHref = '#!/view-poll/' + $stateParams.id;
        }]);
})();