app.service('EventsService', ['$http', '$q', function ($http, $q) {

    this.events = [];
    this.events = events;
    this.addEvent = function (evData) {

        $http.post('api/v1/event/createEvent', evData, function (resp) {

        });
    }
    this.getEvents = function () {
        return this.events;
    }

    this.finalisePlace = function (data) {

    }
    this.proposePlace = function (evId,proposedPlace) {

    }
}]);