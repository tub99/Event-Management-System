app.service('LoginService', ['$http', '$q', 'DataService', 'APP_CONSTANTS', function ($http, $q, DataService, APP_CONSTANTS) {

    this.loginUser = function (userData) {

        return DataService.postData(APP_CONSTANTS.API.USER.SIGNIN, userData)
            .then(function(resp){
                return resp;
            })
            .catch(function(err){
                console.log(err);
                throw err;
            });
    }

    this.resetPassword = function (userData) {
        return DataService.postData(APP_CONSTANTS.API.USER.RESET_PASSWORD, userData)
            .then(function(resp){
                return resp;
            })
            .catch(function(err){return err});
    }
}])