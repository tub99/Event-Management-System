app.service('DataService', ['$http', '$q', function ($http, $q) {

    var parseAPIResponse = function (response) {
        var respData = response.data;
        if (respData.status === '1' && respData.result) {
            var resp = respData.result;
            return respData;
        }
        else if (respData.status === '0' && respData.result) {
            throw new Error(respData.result.message);
        }
    }
    this.postData = function (url, data) {


        return $http.post(url, data).
            then(function (response) {
                return parseAPIResponse(response);

            }).catch(function (err) {
                console.log(err);
                throw err;
            });
    }

    this.getData = function (url) {

        return $http.get(url, function (response) {

            return parseAPIResponse(response);

        }).catch(function (err) {

            throw err;
        });
    }

    this.putData = function (url, data) {

        $http.put(url, data, function (response) {

            return parseAPIResponse(response);

        }).catch(function (err) {

            throw err;
        });
    }
}])