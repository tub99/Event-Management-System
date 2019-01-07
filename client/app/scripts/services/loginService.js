app.service('LoginService', ['DataService', 'APP_CONSTANTS', function (DataService, APP_CONSTANTS) {

    //sends login data to backend to perform authentication
    this.loginUser = function (userData) {

        return DataService.postData(APP_CONSTANTS.API.USER.SIGNIN, userData)
            .then(function (resp) {
                return resp.result;
            })
            .catch(function (err) {
                console.log(err);
                throw err;
            });
    }

    //sends reset password to backend
    this.resetPassword = function (userId, userData) {
        return DataService.putData(APP_CONSTANTS.API.USER.RESET_PASSWORD + '/' + userId, userData)
            .then(function (resp) {
                return resp;
            })
            .catch(function (err) { return err });
    }
}]);