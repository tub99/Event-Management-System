app.controller('addEventsCtrl', ['$scope', '$state', 'EventsService','APP_CONSTANTS', function (scope, state, EventsService,constants) {
    scope.eventAddStatus = false;
    scope.showAlert = false;
    scope.alertMessage = '';

    scope.addAnEvent = function () {
        
        var eventData = { eventName: scope.evName, proposedPlaces: [] };

        EventsService.addEvent(eventData).then(function (resp) {
            swal(constants.SUCCESS_MESSAGE, '', 'success');
        }).catch(function () {
            swal(constants.ERROR_MESSAGE, '', 'error');
        });
    }

    scope.displayStatus = function (bool) {
        scope.showAlert = true;
        scope.eventAddStatus = bool;
        scope.alertMessage = bool ? constants.SUCCESS_MESSAGE : constants.ERROR_MESSAGE;
    }
}]);