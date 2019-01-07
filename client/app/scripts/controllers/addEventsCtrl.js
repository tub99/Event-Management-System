app.controller('addEventsCtrl', ['$scope', '$state', 'EventsService','APP_CONSTANTS', function (scope, state, EventsService,constants) {
    scope.eventAddStatus = false;

    //adds an event created by manager 
    scope.addAnEvent = function () {
        // event model
        var eventData = { eventName: scope.evName, proposedPlaces: [] };
        // adding events
        EventsService.addEvent(eventData).then(function (resp) {
            // clearing model
            scope.evName = '';
            swal(constants.SUCCESS_MESSAGE, '', 'success');
        }).catch(function () {
            //clearing model
            scope.evName = '';
            swal(constants.ERROR_MESSAGE, '', 'error');
        });
    }


  
}]);