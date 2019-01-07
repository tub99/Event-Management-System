describe('loginCtrl test ->', function () {
    var loginCtrl, $scope, $rootScope, constants;

    beforeEach(angular.mock.module('eventManagementApp'));
    beforeEach(inject(function (_APP_CONSTANTS_) {
        constants = _APP_CONSTANTS_;
    }));
    beforeEach(inject(function ($injector) {

        $httpBackend = $injector.get('$httpBackend');
        successRespLogin = { status: '1', result: { data: { message: 'success' } } };

        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        function createController() {
            return $controller('loginCtrl', { $scope: $scope })
        };
        $scope = $rootScope.$new();
        loginCtrl = createController();
    }));

    
    it('should exist', function () {
        expect(loginCtrl).toBeDefined();
    });
    it('should test doLogin', function () {

        spyOn(window, 'swal');
        $httpBackend.when('POST', constants.API.USER.SIGNIN)
            .respond(200, successRespLogin);
        $scope.email = 'tpb@y.com';
        $scope.password = 'abcd';
        $scope.doLogin();
        $httpBackend.flush();
        expect(swal).toHaveBeenCalledWith("Login Success", "", "success")
    });

    it('should test setInput', function () {
        window.event = { target: { value: 'abcd@y.com' } }
        $scope.setInput('email');
        expect($scope.email).toEqual(window.event.target.value)
    });

});