app.controller('employeeCtrl', ['$scope', 'EmployeeService', 'APP_CONSTANTS', function (scope, EmployeeService, constants) {

    scope.employeeAddStatus = false;
    
    //adds an employee and pushes it to backend using EmployeeService,addEmployee()
    scope.addAnEmployee = function () {

        var employeeData = { name: scope.name, email: scope.email, password: scope.password };

        EmployeeService.addEmployee(employeeData).then(function (resp) {
            clearFormData();
            scope.employeeAddStatus = true;
            swal(constants.ADD_EMPLOYEE_SUCCESS, "", "success");
        }).catch(function (err) {

            scope.employeeAddStatus = false;
            swal(constants.ADD_EMPLOYEE_ERROR, "", "error");
        });
    }

    //clears model data 
    function clearFormData() {
        scope.name = '';
        scope.email = '';
        scope.password = '';
    }
}]);