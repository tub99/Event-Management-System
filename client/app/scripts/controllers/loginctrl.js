<<<<<<< HEAD
app.controller('loginCtrl', ['$scope', '$location', 'LoginService', 'UserService', 'APP_CONSTANTS',
    function ($scope, $location, LoginService, UserService, APP_CONSTANTS) {
=======
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
>>>>>>> 3118ebdd57c9b606ca13a02fc5b1c4f609ae96a6

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
                    swal(APP_CONSTANTS.LOGIN_SUCCESS, "", "success");
                })
                .catch(function (err) {
                    swal(APP_CONSTANTS.LOGIN_ERROR, "", "error");
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