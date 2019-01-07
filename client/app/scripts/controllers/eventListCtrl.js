app.controller('eventListCtrl', ['$scope', 'EventsService', 'UserService', function (scope, EventsService, UserService) {

    scope.eventList = [];
    scope.eventProposedPlaces = [];
    scope.proposedPlace = '';
    scope.init = function () {
        EventsService.getEvents().
            then(function (events) {
                scope.eventList = events;
            })
            .catch(function (err) { swal('Oops! Something went wrong!', "", 'error'); })

    }
    var resetEventList = function () {
        //reset previous active
        scope.eventList.map(function (event) {
            event.isActive = false;
        });
    },
        resetModels = function () {
            scope.location = '';
            scope.address = '';
        },
        updateProposedPlaces = function (eventData) {
            scope.selectedEvent.proposedPlaces.push(eventData.place);
            scope.proposedPlace = scope.selectedEvent.proposedPlaces;
        }

    scope.onEventSelect = function (currentEvent) {

        resetEventList();
        currentEvent.isActive = true;
        scope.eventProposedPlaces = currentEvent.proposedPlaces;
        scope.proposedPlace = '';
        scope.selectedEvent = currentEvent;
        resetModels();
    }

    scope.selectPlace = function (place) {
        scope.proposedPlace = place;
    }

    scope.proposeLocation = function () {
        var eventData = {
            place: {
                locationName: scope.location,
                address: scope.address,
                proposedBy: UserService.getUserFromStorage().userId
            }
        }

        EventsService.proposePlace(eventData, scope.selectedEvent._id).
            then(function (proposedResp) {
                swal(proposedResp.message, "", 'success');
                resetModels();
                updateProposedPlaces(eventData);
                scope.selectedEvent.isActive = true;
            })
            .catch(function (err) { swal('Oops! Something went wrong!', "", 'error'); })
    }
    scope.finalizeLocation = function () {
        var eventId = scope.selectedEvent._id,
            locId = scope.proposedPlace._id;
        EventsService.finaliseLocation(eventId, locId).
            then(function (finaliseResp) {
                scope.init();
                resetModels();
                swal(finaliseResp.message, "", 'success');
            })
            .catch(function (err) { swal('Oops! Something went wrong!', "", 'error'); })
    }

    scope.init();
}]); 