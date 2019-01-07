describe('EventsService service test ->', function () {
    var EventsService, constants, successResp, successRespAdd, successRespPut;


    beforeEach(angular.mock.module('eventManagementApp'));


    beforeEach(inject(function (_EventsService_, _APP_CONSTANTS_) {
        EventsService = _EventsService_;
        constants = _APP_CONSTANTS_;
    }));
    beforeEach(inject(function ($injector) {

        $httpBackend = $injector.get('$httpBackend');
        eventList = [{
            "_id": "5c311b71759b3f1fb0524020",
            "updatedAt": "2019-01-05T21:09:33.788Z",
            "createdAt": "2019-01-05T21:02:44.010Z",
            "eventName": "puja outing",
            "__v": 0,
            "isFinalized": false,
            "proposedPlaces": [
                {
                    "_id": "5c311c83c072fb4964463fb0",
                    "address": "22 rajani sen",
                    "locationName": "Howrah"
                },
                {
                    "_id": "5c311cf5c072fb4964463fb1",
                    "address": "45/a hjfd",
                    "locationName": "Ruby"
                },
                {
                    "_id": "5c311d0dc072fb4964463fb2",
                    "address": "12/e science city",
                    "locationName": "JW marriot"
                }
            ]
        },
        {
            "_id": "5c311e0404afc84baccf63b4",
            "updatedAt": "2019-01-05T21:19:38.387Z",
            "createdAt": "2019-01-05T21:13:43.713Z",
            "eventName": "picnic",
            "__v": 0,
            "finalizedLocationId": "5c311e3104afc84baccf63b6",
            "isFinalized": true,
            "proposedPlaces": [
                {
                    "_id": "5c311e2004afc84baccf63b5",
                    "address": "12/e science city",
                    "locationName": "JW marriot"
                },
                {
                    "_id": "5c311e3104afc84baccf63b6",
                    "address": "1/9 ruby",
                    "locationName": "Gateway"
                }
            ]
        }];
        successResp = { status: '1', result: { message: 'success', data: eventList } };
        successRespAdd = { status: '1', result: { message: 'event added success' } };
        successRespPut = { status: '1', result: { message: 'put successful' } }
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    // A simple test to verify the LoginService factory exists
    it('should exist', function () {
        expect(EventsService).toBeDefined();
    });
    it('should test getEvents', function () {
        var obj;
        $httpBackend.when('GET', constants.API.EVENT.EVENT_LIST)
            .respond(200, successResp);
        EventsService.getEvents().then(function (resp) {
            obj = resp;
        });

        $httpBackend.flush();
        expect(eventList).toEqual(obj);
    });

    it('should test addEvent', function () {
        var obj, eventName = 'new event';
        $httpBackend.when('POST', constants.API.EVENT.CREATE_EVENT)
            .respond(200, successRespAdd);

        EventsService.addEvent({ eventName: eventName }).then(function (resp) {
            obj = resp;
        });

        $httpBackend.flush();
        expect(obj.message).toBe('event added success');
    });

    it('should test finaliseLocation', function () {
        var obj, eventName = 'new event';
        $httpBackend.when('PUT', constants.API.EVENT.FINALIZE_LOCATION + '?eventId=' + eventList[0]._id + '&locId=' + eventList[0].proposedPlaces[0]._id)
            .respond(200, successRespPut);
        EventsService.finaliseLocation(eventList[0]._id, eventList[0].proposedPlaces[0]._id).then(function (resp) {
            obj = resp;
        });
        $httpBackend.flush();
        expect(obj.message).toBe('put successful');
    });

    it('should test finaliseLocation', function () {
        var obj, place = { location: 'new location', address: 'somestreet,sommetown' };

        EventsService.proposePlace(place, eventList[0]._id).then(function (resp) {
            obj = resp;
        });
        $httpBackend.when('PUT', constants.API.EVENT.PROPOSE_PLACE + '?eventId=' + eventList[0]._id)
            .respond(200, successRespPut);
        $httpBackend.flush();
        expect(obj.message).toBe('put successful');
    });
});