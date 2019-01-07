app.controller("dashboardCtrl", ['$scope', '$state', '$rootScope', '$stateParams', 'UserService', function (scope, $state, $rootScope, $stateParams, UserService) {


    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name.indexOf(toState.name)!= -1) {
                event.preventDefault();
            }
        });
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {

            scope.userType = UserService.getUserType();
            toState.url.indexOf('employee') > -1 ? scope.setDashboardActiveMode('employeeBtn') : scope.setDashboardActiveMode('eventsBtn');
            console.log(event, toState, toParams, fromState, fromParams)
        });
    scope.dashboardStates = { eventsBtn: false, employeeBtn: true };

    scope.init = function () {
        scope.userEmail = UserService.getUserFromStorage().email;
        scope.userType = UserService.getUserType();
        switch (scope.userType) {
            case 'manager':
                $state.go('dashboard.employee');
                $state.current.name.indexOf('.events') !== -1 ? scope.setDashboardActiveMode('eventsBtn') : scope.setDashboardActiveMode('employeeBtn')
                break;
            case 'employee':
                $state.go("dashboard.events");
                scope.setDashboardActiveMode('eventsBtn');
                break;
            default:
             $state.go("login");
        }

    }



    scope.setDashboardActiveMode = function (state) {

        if (state === 'employeeBtn') {
            scope.dashboardStates.eventsBtn = false;
            scope.dashboardStates.employeeBtn = true;
        } else {
            scope.dashboardStates.employeeBtn = false;
            scope.dashboardStates.eventsBtn = true;
        }
    }

    function routeerErrHandler(err) {
        if (err)
            $state.go('404');
    }
    scope.init();
}]);