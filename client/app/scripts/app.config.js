app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
    function config($stateProvider, $urlRouterProvider, $locationProvider) {


        // $urlRouterProvider.when('', '/login');
        // $urlRouterProvider.when('/', '/login');
        $stateProvider.
            state('dashboard', {
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
            .state('dashboard.events.addEvents',{
                url:'/addEvents',
                templateUrl: './app/views/add_event.html'
            })
            .state('dashboard.events.listofEvents',{
                url:'/listofEvents',
                templateUrl: './app/views/event_list.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: './app/views/login.html'
            })
            .state('default', {
                url: '',
                templateUrl: './app/views/login.html'
            })
            .state('404', {
                url: '/404',
                templateUrl: './app/views/404.html'
            });
        $urlRouterProvider.otherwise('/404');
        // $locationProvider.html5Mode(true);
        // $locationProvider.hashPrefix('!');
    }
]);