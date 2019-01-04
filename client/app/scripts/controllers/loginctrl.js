app.controller('loginCtrl', ['$scope', '$location', 'LoginService', function ($scope, $location, LoginService) {

    $scope.isfpmode = false;
    $scope.fpNotification = '';

    if ($scope.isloggedin) {
        redirectToDashboard();
    }

    $scope.doLogin = function () {
        LoginService.loginUser({ email: $scope.email, password: $scope.password })
            .then(function (resp) {
                redirectToDashboard();
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

    function redirectToDashboard() {
        $location.path('/dashboard').replace();
    }
}]);