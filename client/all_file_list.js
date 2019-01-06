var fileList = [
    './app/scripts/app.js',
    './app/scripts/app.config.js',
    './app/scripts/app.constants.js',
	'./app/scripts/services/dataService.js',
    './app/scripts/services/loginService.js',
    './app/scripts/services/userService.js',
    './app/scripts/services/employeeService.js',
    './app/scripts/services/eventsService.js',
    './app/scripts/controllers/dashboardCtrl.js',
    './app/scripts/controllers/loginctrl.js',
    './app/scripts/controllers/employeectrl.js',
    './app/scripts/controllers/eventsCtrl.js',
    './app/scripts/controllers/addEventsCtrl.js'
];
var libList = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/angular/angular.min.js',
    './node_modules/popper.js/dist/umd/popper.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js'
]

module.exports = { fileList, libList };