app.service('LoginService', ['$http', '$q', function ($http, $q) {

    this.loginUser = function (userData) {

        var deffered = $q.defer();

        $http.post('/login', userData, function (response) {

            if (!response.data) deffered.reject("invalid email or password");
            else deffered.resolve(response.data);

        }).catch(function (err) {
            
            deffered.reject(err.statusText);
        });
        return deffered.promise;
    }

    this.forgotPassword = function(userData){
        var deffered = $q.defer();

        $http.post('/forgotpass', userData, function (response) {

            if (!response.data) deffered.reject("invalid email");
            else deffered.resolve(response.data);

        }).catch(function (err) {
            
            deffered.reject(err.statusText);
        });
        return deffered.promise;
    }
}])