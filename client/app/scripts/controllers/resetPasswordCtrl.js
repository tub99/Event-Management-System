app.controller('resetPasswordCtrl', ['$scope', '$state', '$stateParams', 'LoginService', 'APP_CONSTANTS', function (scope, $state, $stateParams, LoginService, constants) {
    scope.userId = $stateParams.userId;
    scope.resetPassword = function () {
        console.log(scope.password);
        LoginService.resetPassword(scope.userId, { password: scope.password })
            .then(function (resp) {
                return swal(resp.result.message, "", 'success');
            })
            .catch(function (eventErr) {
                throw swal(constants.ERROR_MESSAGE, "", 'error');
            });
        // $location.path('/dashboard/' + type).replace();
    }
}]);