app.controller("dashboardCtrl", ['$scope', '$state', '$rootScope', '$stateParams', 'UserService', function (scope, $state, $rootScope, $stateParams, UserService) {

    scope.dashboardStates = { eventsBtn: false, employeeBtn: true };

    scope.init = function () {
        scope.userType = UserService.getUserType();
        switch (scope.userType) {
            case 'manager':
                $state.go(".employee");
                scope.setDashboardActiveMode('employeeBtn')
                break;
            case 'employee':
                $state.go(".events");
                scope.setDashboardActiveMode('eventsBtn')
                break;
            default: $state.go(".employee");
        }

    }
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {

            scope.userType = UserService.getUserType();
            toState.url.indexOf('employee') > -1 ? scope.setDashboardActiveMode('employeeBtn') : scope.setDashboardActiveMode('eventsBtn');
            console.log(event, toState, toParams, fromState, fromParams)
        });
    $rootScope.$on('$stateChangeError', function (event) {
        $state.go('404');
    });

    scope.setDashboardActiveMode = function (state) {

        if (state === 'employeeBtn') {
            scope.dashboardStates.eventsBtn = false;
            scope.dashboardStates.employeeBtn = true;
        } else {
            scope.dashboardStates.employeeBtn = false;
            scope.dashboardStates.eventsBtn = true;
        }
    }
    scope.init();
}]);