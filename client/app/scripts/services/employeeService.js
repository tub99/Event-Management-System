app.service("EmployeeService", ['DataService', 'APP_CONSTANTS', function (DataService, APP_CONSTANTS) {

    //calls DataService.postData to send added Employee to backend
    this.addEmployee = function (data) {
        return DataService.postData(APP_CONSTANTS.API.USER.SIGNUP, data)
        .then(function(resp){
            return resp;
        })
        .catch(function(err){
            throw err;
        });
    }
}]);