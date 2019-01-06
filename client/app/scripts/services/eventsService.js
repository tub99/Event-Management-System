app.service('EventsService', ['DataService', 'APP_CONSTANTS', function (DataService, APP_CONSTANTS) {

    this.events = [];
    this.events = events;
    this.addEvent = function (eventData) {
        return DataService.postData(APP_CONSTANTS.API.EVENT.CREATE_EVENT, eventData)
            .then(function (eventResp) {
                return eventResp;
            })
            .catch(function (eventErr) {
                throw eventErr;
            });
    }
    this.getEvents = function () {
        return DataService.getData(APP_CONSTANTS.API.EVENT.EVENT_LIST)
            .then(function (eventListResp) {
                this.events = eventListResp.data;
                return this.events;
            })
            .catch(function (eventErr) {
                throw eventErr;
            });
    }

    this.finaliseLocation = function () {
        // passing data in form of query params
        return DataService.put(APP_CONSTANTS.API.EVENT.FINALIZE_LOCATION)
            .then(function (eventFinalizeResp) {
                return eventFinalizeResp;
            })
            .catch(function (eventErr) {
                throw eventErr;
            });
    }

    this.proposePlace = function (place) {
        return DataService.put(APP_CONSTANTS.API.EVENT.PROPOSE_PLACE, place)
            .then(function (eventPropse) {
                return eventPropse.data;
            })
            .catch(function (eventErr) {
                throw eventErr;
            });
    }
}]);