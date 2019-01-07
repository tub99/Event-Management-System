describe('employeeCtrl test ->', function () {
    var employeeCtrl, $scope, $rootScope, constants;

    beforeEach(angular.mock.module('eventManagementApp'));
    beforeEach(inject(function (_APP_CONSTANTS_, _EmployeeService_) {
        constants = _APP_CONSTANTS_;
        EmployeeService = _EmployeeService_;
    }));
    beforeEach(inject(function ($injector) {

        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        function createController() {
            return $controller('employeeCtrl', { $scope: $scope })
        };
        $scope = $rootScope.$new();
        employeeCtrl = createController();
    }));


    it('should exist', function () {
        expect(employeeCtrl).toBeDefined();
    });
    it('should test addAnEmployee', function () {
        $scope.name = 'acdef';
        $scope.email = "abc@y.com";
        $scope.password = "password";
        var employeeData = { name: $scope.name, email: $scope.email, password: $scope.password };
        spyOn(window, 'swal');
        spyOn(EmployeeService, "addEmployee").and.returnValue({ then: function (data) { return { catch: function (err) { } } } });
        $scope.addAnEmployee();
        expect(EmployeeService.addEmployee).toHaveBeenCalledWith(employeeData)
    });

});