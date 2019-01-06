app.service('DataService', ['$http', '$q', function ($http, $q) {

    this.postData = function (url, data) {

       
        return $http.post(url, data, function (response) {

            if (response.status === 1 && response.result) {
                var resp = response.result.data || response.result.message;
                return resp;
            }
            else if (response.status === 0 && response.result) {
                return response.result.message;
            }

        }).catch(function (err) {
            console.log(err);
           return err;
        });
    }

    this.getData = function (url) {
       
        return $http.get(url, function (response) {

            if (response.status === 1 && response.result) {
                var resp = response.result.data || response.result.message;
                return resp;
            }
            else if (response.status === 0 && response.result) {
                return response.result.message
            }

        }).catch(function (err) {

            return err;
        });
    }

    this.putData = function (url, data) {

        $http.put(url, data, function (response) {

            if (response.status === 1 && response.result) {
                var resp = response.result.data || response.result.message;
                return resp;
            }
            else if (response.status === 0 && response.result) {
                return response.result.message
            }

        }).catch(function (err) {
            return err;
        });
    }
}])