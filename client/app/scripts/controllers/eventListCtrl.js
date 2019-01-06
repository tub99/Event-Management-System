app.controller('eventListCtrl', ['$scope', 'EventsService', 'UserService', function (scope, EventsService, UserService) {

    scope.eventList = [];
    scope.eventProposedPlaces = [];
    scope.proposedPlace = '';
    scope.init = function () {
        scope.eventList = EventsService.getEvents();
        scope.userType = UserService.getUserType();
    }

    scope.onEventSelect = function (currentEvent) {

        //reset previous active
        for (event in scope.eventList) {
            scope.eventList[event].isActive = false;
        }
        currentEvent.isActive = true;
        scope.eventProposedPlaces = currentEvent.proposedPlaces;
        scope.proposedPlace = null;
        scope.selectedEvent = currentEvent;
    }

    scope.selectPlace = function (place) {
        scope.proposedPlace = place;
    }

    scope.proposeLocation = function () {
        var eventData = {
            place: {
                locationName: scope.location,
                address: scope.address
            }
        }
        EventsService.proposePlace(scope.selectedEvent._id, eventData);
    }


    scope.init();
}]); 