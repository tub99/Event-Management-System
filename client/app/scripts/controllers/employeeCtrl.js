app.controller('employeeCtrl', ['$scope', 'EmployeeService', 'APP_CONSTANTS', function (scope, EmployeeService, constants) {

    scope.employeeAddStatus = false;
    scope.showAlert = false;
    scope.alertMessage = '';

    scope.addAnEmployee = function () {

        var employeeData = { name: scope.name, email: scope.email, password: scope.password };

        EmployeeService.addEmployee(employeeData).then(function (resp) {

            scope.employeeAddStatus = true;
            scope.showAlert = true;
            scope.alertMessage = constants.SUCCESS_MESSAGE;
            //swal(constants.SUCCESS_MESSAGE, "", "success");
        }).catch(function (err) {

            scope.employeeAddStatus = false;
            scope.showAlert = true;
           // scope.alertMessage = constants.ERROR_MESSAGE;
            swal(constants.ERROR_MESSAGE, "", "success");
        });
    }
}]);