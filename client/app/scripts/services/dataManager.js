app.service('LoginService', ['$http', '$q', function ($http, $q) {

    /**
     * 
     * {
    "status": "1",
    "result": {
        "message": "Sign In successful",
        "data": {
            "userId": "5c3113a0dd7ba343c40537b8",
            "email": "ghoses001@gmail.com",
            "userType": "employee"
        }
    }
}
     */
    this.postData = function (url, data) {

        var deffered = $q.defer();
        // deffered.resolve(userManager);
        deffered.resolve(userEmployee);
        $http.post(url, data, function (response) {

            if (response.status) deffered.reject("invalid email or password");
            else deffered.resolve(response.data);

        }).catch(function (err) {

            deffered.reject(err.statusText);
        });
        return deffered.promise;
    }

    this.getData = function (userData) {
        var deffered = $q.defer();

        $http.post('/forgotpass', userData, function (response) {

            if (!response.data) deffered.reject("invalid email");
            else deffered.resolve(response.data);

        }).catch(function (err) {

            deffered.reject(err.statusText);
        });
        return deffered.promise;
    }
    this.putData = function () {

    }
}])