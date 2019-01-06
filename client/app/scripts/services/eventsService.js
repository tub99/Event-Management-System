app.service('EventsService', ['$http', '$q', function ($http, $q) {

    this.events =[];
    this.addEvent = function(evData){

        $http.post('api/v1/event/createEvent',evData,function(resp){

        });
    }
}]);