app.service('DataService', ['$http', '$q', function ($http, $q) {

    //parses and simplifies response recieved from API calls
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

    // performs POST http call
    this.postData = function (url, data) {


        return $http.post(url, data).
            then(function (response) {
                return parseAPIResponse(response);

            }).catch(function (err) {
                console.log(err);
                throw err;
            });
    }
    
    // performs GET http call
    this.getData = function (url) {

        return $http.get(url).then(function (response) {

            return parseAPIResponse(response);

        }).catch(function (err) {

            throw err;
        });
    }

    // performs PUT http call
    this.putData = function (url, data) {

        return $http.put(url, data).then(function (response) {

            return parseAPIResponse(response);

        }).catch(function (err) {

            throw err;
        });
    }
}])