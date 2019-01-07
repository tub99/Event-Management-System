app.controller('eventListCtrl', ['$scope', 'EventsService', 'UserService','APP_CONSTANTS', function (scope, EventsService, UserService, APP_CONSTANTS) {

    scope.eventList = [];
    scope.eventProposedPlaces = [];
    scope.proposedPlace = '';
    scope.isEventsLoaded = false;
    scope.isFinalized = false;
    scope.init = function () {
        EventsService.getEvents().
            then(function (events) {
                scope.eventList = events;
                scope.isEventsLoaded = true;
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
        };

    scope.onEventSelect = function (currentEvent) {

        resetEventList();
        currentEvent.isActive = true;
        scope.eventProposedPlaces = currentEvent.proposedPlaces;
        scope.proposedPlace = '';
        scope.selectedEvent = currentEvent;
        scope.isFinalized = false;
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
                swal(APP_CONSTANTS.PROPOSE_PLACE_SUCCESS, "", 'success');
                resetModels();
                updateProposedPlaces(eventData);
                scope.selectedEvent.isActive = true;
            })
            .catch(function (err) { swal(APP_CONSTANTS.ERROR_MESSAGE, "", 'error'); })
    }
    scope.finalizeLocation = function () {
        var eventId = scope.selectedEvent._id,
            locId = scope.proposedPlace._id;
        EventsService.finaliseLocation(eventId, locId).
            then(function (finaliseResp) {
                scope.init();
                resetModels();
                scope.proposedPlace = '';
                swal(APP_CONSTANTS.FINALIZE_LOCATION_SUCCESS, "", 'success');
            })
            .catch(function (err) { swal(APP_CONSTANTS.ERROR_MESSAGE, "", 'error'); })
    }

    scope.init();
}]); 