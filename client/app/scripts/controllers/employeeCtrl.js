app.controller('employeeCtrl', ['$scope', 'EmployeeService', 'APP_CONSTANTS', function (scope, EmployeeService, constants) {

    scope.employeeAddStatus = false;
    
    //adds an employee and pushes it to backend using EmployeeService,addEmployee()
    scope.addAnEmployee = function () {

        var employeeData = { name: scope.name, email: scope.email, password: scope.password };
        // add an emplyee by manager
        EmployeeService.addEmployee(employeeData).then(function (resp) {
            // clearing data once submitted
            clearFormData();
            scope.employeeAddStatus = true;
            swal(constants.ADD_EMPLOYEE_SUCCESS, "", "success");
        }).catch(function (err) {
            // clearing data once submitted even if error
            //so that user can again feed in the info
            clearFormData();
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