// middle ware function to act between routes to check user authentication
// via user existense
function checkForAuthenticatedUser(UserService, $state, $location) {
    if (UserService.getUserFromStorage()) {
        return true;
    } else {
        swal('You have been logged out, please Re-Login','','error');
        $state.go('login');    
    }
}

app.config(['$qProvider', '$stateProvider', '$urlRouterProvider',
    function config($qProvider, $stateProvider, $urlRouterProvider) {

        $qProvider.errorOnUnhandledRejections(false);

        $stateProvider.
            state('login', {
                url: '',
                templateUrl: './app/views/login.html'
            })
            .state('resetPassword', {
                url: '/resetPassword/:userId',
                templateUrl: './app/views/reset_password.html'
            })
            .state('dashboard', {
                url: '/dashboard/:userType',
                templateUrl: './app/views/dashboard.html',
                resolve: {
                    resolvedUser: checkForAuthenticatedUser
                }
            })
            .state('dashboard.employee', {
                url: '/employee',
                templateUrl: './app/views/employee.html'
            })
            .state('dashboard.events', {
                url: '/events',
                templateUrl: './app/views/events.html'
            })
            .state('dashboard.events.addEvents', {
                url: '/addEvents',
                templateUrl: './app/views/add_event.html'
            })
            .state('dashboard.events.listofEvents', {
                url: '/listofEvents',
                templateUrl: './app/views/event_list.html'
            });

        $urlRouterProvider.otherwise('');
    }
]);