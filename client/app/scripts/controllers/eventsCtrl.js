app.controller('eventsCtrl', ['$scope', '$state', 'UserService', '$stateParams', '$rootScope', 'APP_CONSTANTS', function (scope, $state, UserService, $stateParams, $rootScope, constants) {
    scope.eventsCtrlState = { addEvent: true, eventList: false };

    //handles transition to nested route on controller init
    scope.init = function () {
        scope.userType = UserService.getUserType();

        switch (scope.userType) {
            case 'manager':
                $state.go('dashboard.events.addEvents');
                // Tabs to be anabled as per user : manager can add events
                scope.setActiveEventCtrlState('addEvent');
                break;
            case 'employee':
                // Tabs to be anabled as per user: emplyee can only see event list
                $state.go('dashboard.events.listofEvents');
                scope.setActiveEventCtrlState('eventList');
                break;
        }
    }

    //sets current active state of UI routing buttons
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
            // //sets current active state of UI routing buttons
            scope.userType = UserService.getUserType();
            toState.url.indexOf(constants.routes.ADD_EVENT) > -1 ? scope.setActiveEventCtrlState(constants.routes.ADD_EVENT) : scope.setActiveEventCtrlState(constants.routes.LIST_OF_EVENTS);
            console.log(event, toState, toParams, fromState, fromParams)
        });

    scope.init();
}])