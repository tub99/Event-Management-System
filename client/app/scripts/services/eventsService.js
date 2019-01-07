app.service('EventsService', ['DataService', 'APP_CONSTANTS', function (DataService, APP_CONSTANTS) {

    this.events = [];
    
    //gets added an event by user and pushes to backend by the help of DataService.postData()
    this.addEvent = function (eventData) {
        return DataService.postData(APP_CONSTANTS.API.EVENT.CREATE_EVENT, eventData)
            .then(function (eventResp) {
                return eventResp.result;
            })
            .catch(function (eventErr) {
                throw eventErr;
            });
    }

    //used to get Updated events from backend 
    this.getEvents = function () {
        return DataService.getData(APP_CONSTANTS.API.EVENT.EVENT_LIST)
            .then(function (eventListResp) {
                this.events = eventListResp.result.data;
                return this.events;
            })
            .catch(function (eventErr) {
                throw eventErr;
            });
    }

    //sends finalised location to backend with the help of DataService.putData
    this.finaliseLocation = function (eventId, locationId) {
        // passing data in form of query params
        var finaliseUrl = APP_CONSTANTS.API.EVENT.FINALIZE_LOCATION+'?eventId='+eventId+'&locId='+locationId;
        return DataService.putData(finaliseUrl)
            .then(function (eventFinalizeResp) {
                return eventFinalizeResp.result;
            })
            .catch(function (eventErr) {
                throw eventErr;
            });
    }

    //sends proposed place to backend with the help of DataService.putData
    this.proposePlace = function (place, eventId) {
        return DataService.putData(APP_CONSTANTS.API.EVENT.PROPOSE_PLACE+'?eventId='+eventId, place)
            .then(function (eventPropse) {
                return eventPropse.result;
            })
            .catch(function (eventErr) {
                throw eventErr;
            });
    }
}]);