app.controller('eventListCtrl', ['$scope', 'EventsService', function (scope, EventsService) {

    scope.eventList = [];
    scope.eventProposedPlaces = [];
    scope.proposedPlace = '';
    scope.init = function () {
        EventsService.getEvents().
            then(function (events) {
                scope.eventList = events;
                scope.eventProposedPlaces = [];
            })
            .catch(function (err) { return err; })

    }
    var resetEventList = function () {
        //reset previous active
        scope.eventList.map(function (event) {
            event.isActive = false;
        });
    }
    scope.onEventSelect = function (currentEvent) {

        resetEventList();
        currentEvent.isActive = true;
        scope.eventProposedPlaces = currentEvent.proposedPlaces;
        scope.proposedPlace = '';
        scope.selectedEvent = currentEvent;
        scope.resetModels();
    }

    scope.selectPlace = function (place) {
        scope.proposedPlace = place;
    }

    scope.finalise = function () {

        EventsService.finaliseLocation(scope.selectedEvent.id, scope.proposedPlace.id)
            .then(function (finaliseResp) {
                scope.init();
                scope.resetModels();
                alert(finaliseResp.message);
            })
            .catch(function (err) { alert(err); })
    }

    scope.proposeLocation = function () {
        var eventData = {
            place: {
                locationName: scope.location,
                address: scope.address
            }
        }
        EventsService.proposePlace(eventData, scope.selectedEvent._id)
            .then(function (proposedResp) {
                scope.init();
                scope.resetModels();
                alert(proposedResp.message);
            })
            .catch(function (err) { alert(err); })
    }
    scope.resetModels = function () {
        scope.location = '';
        scope.address = '';
    }
    scope.init();
}]); 