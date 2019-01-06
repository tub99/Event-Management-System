app.controller('eventListCtrl', ['$scope', 'EventsService', function (scope, EventsService) {

    scope.eventList = [];
    scope.eventProposedPlaces = [];
    scope.proposedPlace = '';
    scope.init = function () {
        scope.eventList = EventsService.getEvents();
    }

    scope.onEventSelect = function (currentEvent) {

        //reset previous active
        for (event in scope.eventList) {
            scope.eventList[event].isActive = false;
        }
        currentEvent.isActive = true;
        scope.eventProposedPlaces = currentEvent.proposedPlaces;
        scope.proposedPlace = '';
        scope.selectedEvent = currentEvent;
    }

    scope.selectPlace = function (place) {
        scope.proposedPlace = place;
    }

    scope.finaliseList = function (place) {
        var eventData = {
            place: {
                locationName: place.locationName,
                address: place.address
            }
        }
        EventsService.finalisePlace(scope.selectedEvent._id, eventData);
    }
    scope.init();
}]); 