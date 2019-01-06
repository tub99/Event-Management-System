app.controller('eventsCtrl', ['$scope', '$state', 'UserService', '$stateParams', '$rootScope', 'APP_CONSTANTS', function (scope, $state, UserService, $stateParams, $rootScope, constants) {
    scope.eventsCtrlState = { addEvent: true, eventList: false };

    scope.init = function () {
        scope.userType = UserService.getUserType();
        console.log($stateParams)
        switch (scope.userType) {
            case 'manager':
                $state.go('.addEvents');
                scope.setActiveEventCtrlState('addEvent');
                break;
            case 'employee':
                $state.go('.listofEvents');
                scope.setActiveEventCtrlState('eventList');
                break;
        }
    }
    scope.setActiveEventCtrlState = function (state) {
        if (state === constants.routes.ADD_EVENT) {
            scope.eventsCtrlState.addEvent = true;
            scope.eventsCtrlState.eventList = false;
        } else {
            scope.eventsCtrlState.addEvent = false;
            scope.eventsCtrlState.eventList = true;
        }
    }
    $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {

            scope.userType = UserService.getUserType();
            toState.url.indexOf(constants.routes.ADD_EVENT) > -1 ? scope.setActiveEventCtrlState(constants.routes.ADD_EVENT) : scope.setActiveEventCtrlState(constants.routes.LIST_OF_EVENTS);
            console.log(event, toState, toParams, fromState, fromParams)
        });

    scope.init();
}])