app.controller('eventListCtrl', ['$scope', 'EventsService', function (scope, EventsService) {

    scope.eventList = [];
    scope.eventProposedPlaces = [];
    scope.proposedPlace = '';
    scope.init = function () {
        EventsService.getEvents().
            then(function (events) {
                scope.eventList = events;
            })
            .catch(function (err) { return err; })

    }

    scope.onEventSelect = function (currentEvent) {

        //reset previous active
        for (event in scope.eventList) {
            scope.eventList[event].isActive = false;
        }
        currentEvent.isActive = true;
        scope.eventProposedPlaces = currentEvent.proposedPlaces;
        scope.proposedPlace = '';
    }

    scope.selectPlace = function (place) {
        scope.proposedPlace = place.locationName;
    }

    scope.finaliseList = function () {
        EventsService.finaliseLocation(scope.proposedPlace);
    }

    scope.init();
}]); 