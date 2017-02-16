(() => {
    'use strict';

    const app = angular.module('rolliPolli', []);

    app.controller('mainCtrl', function() {
        const self = this;

        this.name = "Rolli Polli";
    });
})();