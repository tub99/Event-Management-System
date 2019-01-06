
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
                templateUrl: './app/views/dashboard.html'
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
            })
            .state('404', {
                url: '/404',
                templateUrl: './app/views/404.html'
            });
        $urlRouterProvider.otherwise('/404');
    }
]);