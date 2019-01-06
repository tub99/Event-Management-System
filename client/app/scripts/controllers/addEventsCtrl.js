app.controller('addEventsCtrl', ['$scope', '$state', 'EventsService','APP_CONSTANTS', function (scope, state, EventsService,constants) {
    scope.eventAddStatus = false;
    scope.showAlert = false;
    scope.alertMessage = '';

    scope.addAnEvent = function () {
        
        evData = { eventName: scope.evName, finalised: false };

        EventsService.addEvent(evData).then(function (resp) {
            scope.displayStatus(true);
        }).catch(function () {
            scope.displayStatus(false);
        });
    }

    scope.displayStatus = function (bool) {
        scope.showAlert = true;
        scope.eventAddStatus = bool;
        scope.alertMessage = bool ? constants.SUCCESS_MESSAGE : constants.ERROR_MESSAGE;
    }
}]);