app.controller("dashboardCtrl", ['$scope', '$state', '$rootScope', '$stateParams', 'UserService', function (scope, $state, $rootScope, $stateParams, UserService) {

    // preventing child routes to hinder parent routes
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {
            if (fromState.name.indexOf(toState.name)!= -1) {
                event.preventDefault();
            }
        });
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            // setting the Tab active mode for different types of routes
            scope.userType = UserService.getUserType();
            toState.url.indexOf('employee') > -1 ? scope.setDashboardActiveMode('employeeBtn') : scope.setDashboardActiveMode('eventsBtn');
          
        });
       // dashboard models 
    scope.dashboardStates = { eventsBtn: false, employeeBtn: true };

    //on controller init handes nested route redirection
    scope.init = function () {
        scope.userEmail = UserService.getUserFromStorage().email;
        scope.userType = UserService.getUserType();
        switch (scope.userType) {
            case 'manager':
                $state.go('dashboard.employee');
                 // setting the Tab active mode for different types of routes: manager
                $state.current.name.indexOf('.events') !== -1 ? scope.setDashboardActiveMode('eventsBtn') : scope.setDashboardActiveMode('employeeBtn')
                break;
            case 'employee':
                $state.go("dashboard.events");
                 // setting the Tab active mode for different types of routes: employee
                scope.setDashboardActiveMode('eventsBtn');
                break;
            default:
             $state.go("login");
        }

    }


    //switches UI active state of routing buttons 
    scope.setDashboardActiveMode = function (state) {

        if (state === 'employeeBtn') {
            scope.dashboardStates.eventsBtn = false;
            scope.dashboardStates.employeeBtn = true;
        } else {
            scope.dashboardStates.employeeBtn = false;
            scope.dashboardStates.eventsBtn = true;
        }
    }
    // route error handler
    function routeerErrHandler(err) {
        if (err)
            $state.go('login');
    }
    scope.init();
}]);