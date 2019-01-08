app.controller('eventListCtrl', ['$scope', 'EventsService', 'UserService', 'APP_CONSTANTS', function (scope, EventsService, UserService, APP_CONSTANTS) {
    //reset previous active
    var resetEventList = function () {
        scope.eventList.map(function (event) {
            event.isActive = false;
        });
    },
        // reset place attributes
        resetModels = function () {
            scope.location = '';
            scope.address = '';
        },
        // update the propsed place once proposed to reflect in model
        updateProposedPlaces = function (eventData) {
            scope.selectedEvent.proposedPlaces.push(eventData.place);
            scope.proposedPlace = scope.selectedEvent.proposedPlaces;
        },
        updateProposedPlacesOnRefresh = function (eventArr, selectedEvent) {

            eventArr.map(function (evData) {
                if (selectedEvent._id === evData._id)
                    scope.eventProposedPlaces = evData.proposedPlaces;
            })
        }
    activateEvent = function () {
        scope.eventList.forEach(function (evt) {
            if (scope.selectedEvent._id === evt._id) {
                evt.isActive = true;
            }
        });

    };

    scope.eventList = [];
    scope.eventProposedPlaces = [];
    scope.proposedPlace = '';
    scope.isEventsLoaded = false;
    scope.isFinalized = false;

    // Initialize the event list data
    scope.init = function () {
        EventsService.getEvents().
            then(function (events) {
                scope.eventList = events;
                scope.isEventsLoaded = true;
                // Activate currently selected event while refetch data
                if (scope.selectedEvent) {
                    activateEvent();
                    updateProposedPlacesOnRefresh(events, scope.selectedEvent);
                }
            })
            .catch(function (err) { swal(APP_CONSTANTS.ERROR_MESSAGE, "", 'error'); })

    }


    scope.onEventSelect = function (currentEvent) {
        //reset Active for all events
        resetEventList();
        //set active for current 
        currentEvent.isActive = true;
        scope.eventProposedPlaces = currentEvent.proposedPlaces;
        scope.proposedPlace = '';
        scope.selectedEvent = currentEvent;
        scope.isFinalized = false;
        // update the proposed places
        resetModels();
        // refetch data 
        scope.init();
    }

    // select a place
    scope.selectPlace = function (place) {
        scope.proposedPlace = place;
    }

    // propose a location by employee
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
                // updation of data after propose
                resetModels();
                updateProposedPlaces(eventData);
                scope.selectedEvent.isActive = true;
            })
            .catch(function (err) {
                scope.init();
                swal(err.message, "", 'error');
            })
    }

    // finalize location by manager
    scope.finalizeLocation = function () {
        var eventId = scope.selectedEvent._id,
            locId = scope.proposedPlace._id;
        EventsService.finaliseLocation(eventId, locId).
            then(function (finaliseResp) {
                // refetch data to update in view
                scope.init();
                resetModels();
                scope.proposedPlace = '';
                swal(APP_CONSTANTS.FINALIZE_LOCATION_SUCCESS, "", 'success');
            })
            .catch(function (err) { swal(err.message, "", 'error'); })
    }
    // fetches event list on load of the ctrl
    scope.init();
}]); 