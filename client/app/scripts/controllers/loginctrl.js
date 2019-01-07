app.controller('loginCtrl', ['$scope', '$location', 'LoginService', 'UserService', function ($scope, $location, LoginService, UserService) {

    $scope.isfpmode = false;
    $scope.fpNotification = '';

    if ($scope.isloggedin) {
        redirectToDashboard();
    }

    $scope.doLogin = function () {
        LoginService.loginUser({ email: $scope.email, password: $scope.password })
            .then(function (resp) {
                UserService.addCurrentUser(resp.data);
                UserService.addUserToStorage(resp.data);
                redirectToDashboard(resp.data.userType);
                swal("Login Success", "", "success");
            })
            .catch(function (err) {
                swal("Oops! Login Failure", "", "error");
            });
    }

    $scope.setFpMode = function (bool) {
        $scope.resetFormdata();
        $scope.isfpmode = bool;
    }


    $scope.resetFormdata = function () {
        $scope.email = '';
        $scope.password = '';
        $scope.fpNotification = '';
    }

    $scope.setInput = function (field) {
        $scope[field] = event.target.value;
    }

    $scope.logout = function () {
        UserService.removeUserFromStorage();
    }

    function redirectToDashboard(type) {
        $location.path('/dashboard/' + type).replace();
    }
    $scope.logout();
}]);