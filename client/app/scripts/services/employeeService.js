app.service("EmployeeService", ['$http', '$q', function ($http, $q) {

    this.addEmployee = function (data) {
        var deferred = $q.defer();
        $http.post('', data, function (resp) {
            if (resp) {
                deferred.resolve(resp);
            } else {
                deferred.reject('Oopss a problem occured!!');
            }
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);