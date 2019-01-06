app.service('LoginService', ['DataService', 'APP_CONSTANTS', function (DataService, APP_CONSTANTS) {

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

    this.resetPassword = function (userId, userData) {
        return DataService.putData(APP_CONSTANTS.API.USER.RESET_PASSWORD + '/' + userId, userData)
            .then(function (resp) {
                return resp;
            })
            .catch(function (err) { return err });
    }
}]);