describe('DataService service test ->', function () {
    var DataService, constants, successRespGet, successRespPost, successRespPut;


    beforeEach(angular.mock.module('eventManagementApp'));


    beforeEach(inject(function (_DataService_, _APP_CONSTANTS_) {
        DataService = _DataService_;
        constants = _APP_CONSTANTS_;
    }));
    beforeEach(inject(function ($injector) {

        $httpBackend = $injector.get('$httpBackend');
        successRespGet = { status: '1', result: { message: 'success', data: {} } };
        successRespPost = { status: '1', result: { message: 'event added success' } };
        successRespPut = { status: '1', result: { message: 'put successful' } }
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    // A simple test to verify the LoginService factory exists
    it('should exist', function () {
        expect(DataService).toBeDefined();
    });
    it('should test getData', function () {
        var obj;
        $httpBackend.when('GET', constants.API.EVENT.EVENT_LIST)
            .respond(200, successRespGet);
        DataService.getData(constants.API.EVENT.EVENT_LIST).then(function (resp) {
            expect(resp).toEqual(successRespGet);
        });
        $httpBackend.flush();
    });

    it('should test postData', function () {
        var obj, eventName = 'new event';
        $httpBackend.when('POST', constants.API.EVENT.CREATE_EVENT)
            .respond(200, successRespPost);

        DataService.postData(constants.API.EVENT.CREATE_EVENT, { eventName: eventName }).then(function (resp) {
            expect(resp).toEqual(successRespPost);
        });

        $httpBackend.flush();
    });

    it('should test putData', function () {
        var obj, eventName = 'new event';
        $httpBackend.when('PUT', constants.API.EVENT.FINALIZE_LOCATION)
            .respond(200, successRespPut);
        DataService.putData(constants.API.EVENT.FINALIZE_LOCATION, { eventName: eventName }).then(function (resp) {
            expect(resp).toEqual(successRespPut);
        });
        $httpBackend.flush();
    });

});