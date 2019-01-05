app.controller('employeeCtrl', ['$scope', 'EmployeeService', function (scope, EmployeeService) {

    scope.employeeAddStatus = false;
    scope.showAlert = false;
    scope.SUCCESS_MESSAGE = "Hurray! Successfull";
    scope.ERROR_MESSAGE = "Ooops! an error occured :(";
    scope.alertMessage = '';

    scope.addAnEmployee = function () {

        var employeeData = { name: scope.name, email: scope.email, password: scope.password };

        EmployeeService.addEmployee(employeeData).then(function (resp) {
            
            scope.employeeAddStatus = true;
            scope.showAlert = true;
            scope.alertMessage = scope.SUCCESS_MESSAGE;

        }).catch(function (err) {

            scope.employeeAddStatus = false;
            scope.showAlert = true;
            scope.alertMessage = scope.ERROR_MESSAGE;
        });
    }
}]);