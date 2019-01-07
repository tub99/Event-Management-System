describe('LoginService service test ->', function () {
    var LoginService, constants, successRespLogin, successRespResetPass;


    beforeEach(angular.mock.module('eventManagementApp'));


    beforeEach(inject(function (_LoginService_, _APP_CONSTANTS_) {
        LoginService = _LoginService_;
        constants = _APP_CONSTANTS_;
    }));
    beforeEach(inject(function ($injector) {

        $httpBackend = $injector.get('$httpBackend');
        successRespLogin = { status: '1', result: { data: { message: 'success' } } };
        successRespResetPass = { status: '1', result: { data: { message: 'reset password success' } } };
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    // A simple test to verify the LoginService factory exists
    it('should exist', function () {
        expect(LoginService).toBeDefined();
    });

    it('should test loginUser', function () {
        var obj;
        $httpBackend.when('POST', constants.API.USER.SIGNIN)
            .respond(200, successRespLogin);
        LoginService.loginUser({ email: 'abc@mail.com', password: 'pass' }).then(function (resp) {
            obj = resp.data;
        });

        $httpBackend.flush();
        expect(obj.message).toBe('success');
    });

    it('should test resetPassword', function () {
        var obj, userData = { password: 'abcd' }, userId = '5EE7BTS';
        $httpBackend.when('PUT', constants.API.USER.RESET_PASSWORD + '/' + userId)
            .respond(200, successRespResetPass);

        LoginService.resetPassword(userId, userData).then(function (resp) {
            obj = resp.result.data;
        });

        $httpBackend.flush();
        expect(obj.message).toBe('reset password success');
    });
});