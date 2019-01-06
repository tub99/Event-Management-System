app.service('DataService', ['$http', '$q', function ($http, $q) {

    this.postData = function (url, data) {

       
        return $http.post(url, data, function (response) {

            if (response.status === 1 && response.result) {
                var resp = response.result.data || response.result.message;
                return resp;
            }
            else if (response.status === 0 && response.result) {
                return response.result.message
            }

        }).catch(function (err) {
            console.log(err);
           return err;
        });
    }

    this.getData = function (url) {
        var deffered = $q.defer();

        $http.get(url, function (response) {

            if (response.status === 1 && response.result) {
                var resp = response.result.data || response.result.message;
                deffered.resolve(resp);
            }
            else if (response.status === 0 && response.result) {
                deffered.reject(response.result.message);
            }

        }).catch(function (err) {

            deffered.reject(err.statusText);
        });
        return deffered.promise;
    }

    this.putData = function (url, data) {
        var deffered = $q.defer();

        $http.put(url, data, function (response) {

            if (response.status === 1 && response.result) {
                var resp = response.result.data || response.result.message;
                deffered.resolve(resp);
            }
            else if (response.status === 0 && response.result) {
                deffered.reject(response.result.message);
            }

        }).catch(function (err) {

            deffered.reject(err.statusText);
        });
        return deffered.promise;
    }
}])