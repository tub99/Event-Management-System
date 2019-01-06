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
    }

    scope.selectPlace = function (place) {
        scope.proposedPlace = place;
    }

    scope.proposePlace = function (place) {
        var eventData = {
            place: {
                locationName: place.locationName,
                address: place.address
            }
        }
        EventsService.proposePlace(eventData, scope.selectedEvent._id).
            then(function (proposedResp) {
                swal(proposedResp.message, "", 'success');
            })
            .catch(function (err) { swal('Oops! Something went wrong!', "", 'error'); })
    }
    scope.finalizeLocation = function () {
        var eventId = scope.selectedEvent._id,
            locId = scope.proposedPlace._id;
        EventsService.finaliseLocation(eventId, locId).
            then(function (finaliseResp) {
                swal(finaliseResp.message, "", 'success');
            })
            .catch(function (err) { swal('Oops! Something went wrong!', "", 'error'); })
    }

    scope.init();
}]); 