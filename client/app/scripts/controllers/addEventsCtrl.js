app.controller('addEventsCtrl', ['$scope', '$state', 'EventsService','APP_CONSTANTS', function (scope, state, EventsService,constants) {
    scope.eventAddStatus = false;

    //adds an event created by manager 
    scope.addAnEvent = function () {
        
        var eventData = { eventName: scope.evName, proposedPlaces: [] };

        EventsService.addEvent(eventData).then(function (resp) {
            scope.evName = '';
            swal(constants.SUCCESS_MESSAGE, '', 'success');
        }).catch(function () {
            scope.evName = '';
            swal(constants.ERROR_MESSAGE, '', 'error');
        });
    }

  
}]);