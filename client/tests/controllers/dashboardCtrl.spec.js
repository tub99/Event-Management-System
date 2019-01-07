describe('dashboardCtrl test ->', function () {
    var dashboardCtrl, $scope, $rootScope, constants;

    beforeEach(angular.mock.module('eventManagementApp'));
    beforeEach(inject(function (_APP_CONSTANTS_, _UserService_, _$state_) {
        constants = _APP_CONSTANTS_;
        UserService = _UserService_;
        $state = _$state_;
    }));
    beforeEach(inject(function ($injector) {
        UserService.addUserToStorage({ email: 'abc@y.com', password: 'abcd', userId: '1223', userType: 'manager' })
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        function createController() {
            return $controller('dashboardCtrl', { $scope: $scope })
        };
        $scope = $rootScope.$new();
        dashboardCtrl = createController();
    }));


    it('should exist', function () {
        expect(dashboardCtrl).toBeDefined();
    });
    it('should test init', function () {
        spyOn($state, "go");
        $scope.init();
        expect($state.go).toHaveBeenCalledWith('dashboard.employee');
    });
    it('should test setDashboardActiveMode', function () {
        $scope.setDashboardActiveMode('employeeBtn');
        expect($scope.dashboardStates.eventsBtn).toBeFalsy();
    });

});