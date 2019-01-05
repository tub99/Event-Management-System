app.controller('loginCtrl', ['$scope', '$location', 'LoginService', 'UserService', function ($scope, $location, LoginService, UserService) {

    $scope.isfpmode = false;
    $scope.fpNotification = '';

    if ($scope.isloggedin) {
        redirectToDashboard();
    }

    $scope.doLogin = function () {
        LoginService.loginUser({ email: $scope.email, password: $scope.password })
            .then(function (resp) {
                UserService.addCurrentUser(resp);
                redirectToDashboard(resp.userType);
            })
            .catch(function (err) {

            });
    }

    $scope.setFpMode = function (bool) {
        $scope.resetFormdata();
        $scope.isfpmode = bool;
    }

    $scope.forgotPass = function () {

        LoginService.loginUser({ email: $scope.email })
            .then(function (resp) {
                $scope.fpNotification = "email sent";
            })
            .catch(function (err) {

            });
    }

    $scope.resetFormdata = function () {
        $scope.email = '';
        $scope.password = '';
        $scope.fpNotification = '';
    }

    function redirectToDashboard(type) {
        $location.path('/dashboard/' + type).replace();
    }
}]);