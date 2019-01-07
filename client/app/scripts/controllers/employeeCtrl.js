app.controller('employeeCtrl', ['$scope', 'EmployeeService', 'APP_CONSTANTS', function (scope, EmployeeService, constants) {

    scope.employeeAddStatus = false;

    scope.addAnEmployee = function () {

        var employeeData = { name: scope.name, email: scope.email, password: scope.password };

        EmployeeService.addEmployee(employeeData).then(function (resp) {

            scope.employeeAddStatus = true;
            swal(constants.ADD_EMPLOYEE_SUCCESS, "", "success");
        }).catch(function (err) {

            scope.employeeAddStatus = false;
            swal(constants.ADD_EMPLOYEE_ERROR, "", "error");
        });
    }
}]);