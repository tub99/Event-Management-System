app.controller('loginCtrl', ['$scope', '$location', 'LoginService', 'UserService', 'APP_CONSTANTS',
    function ($scope, $location, LoginService, UserService, APP_CONSTANTS) {

        $scope.isfpmode = false;
        $scope.fpNotification = '';
        // if user is authenticated move to dashboard
        if ($scope.isloggedin) {
            redirectToDashboard();
        }

        //performs user login and sends response data to Userservice to store it to localStorge 
        $scope.doLogin = function () {
            LoginService.loginUser({ email: $scope.email, password: $scope.password })
                .then(function (resp) {
                    // Adds User Data to storage for persistence from FE
                    UserService.addCurrentUser(resp.data);
                    UserService.addUserToStorage(resp.data);
                     // if user is authenticated move to dashboard
                    redirectToDashboard(resp.data.userType);
                    swal(APP_CONSTANTS.LOGIN_SUCCESS, "", "success");
                })
                .catch(function (err) {
                    swal(APP_CONSTANTS.LOGIN_ERROR, "", "error");
                });
        }

        $scope.setFpMode = function (bool) {
            // reset Form Data
            $scope.resetFormdata();
            $scope.isfpmode = bool;
        }
        // reset password 
        $scope.forgotPass = function () {

            LoginService.loginUser({ email: $scope.email })
                .then(function (resp) {
                    $scope.fpNotification = "email sent";
                })
                .catch(function (err) {

                });
        }
        // resetting the form data
        $scope.resetFormdata = function () {
            $scope.email = '';
            $scope.password = '';
            $scope.fpNotification = '';
        }
        // overcomes ng-model instability
        $scope.setInput = function (field) {
            $scope[field] = event.target.value;
        }
        // logout user 
        $scope.logout = function () {
            UserService.removeUserFromStorage();
        }
        // removing history for back and forth. keeping routes stable throughout app
        function redirectToDashboard(type) {
            $location.path('/dashboard/' + type).replace();
        }
        $scope.logout();
    }]);