app.controller('resetPasswordCtrl', ['$scope', '$state', '$location', '$stateParams', 'LoginService', 'APP_CONSTANTS', function (scope, $state, $location, $stateParams, LoginService, constants) {
    scope.userId = $stateParams.userId;

    //Resets user Password and redirects to login page on success response 
    scope.resetPassword = function () {
        console.log(scope.password);
        LoginService.resetPassword(scope.userId, { password: scope.password })
            .then(function (resp) {
                return swal(resp.result.message, "", 'success').then(function () {
                    $location.path('').replace();
                    $state.go('login');
                });
            })
            .catch(function (eventErr) {
                throw swal(constants.ERROR_MESSAGE, "", 'error');
            });

    }
}]);