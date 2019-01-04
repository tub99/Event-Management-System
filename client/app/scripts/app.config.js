app.config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.
            when('/dashboard', {
                templateUrl: './app/views/dashboard.html'
            }).
            when('/', {
                templateUrl: './app/views/login.html'
            }).
            otherwise({
                templateUrl: './app/views/404.html'
            });
    }
]);