app.controller('eventsCtrl', ['$scope', '$state', 'UserService', function (scope, $state, UserService) {
    scope.eventsCtrlState = { addEvent: true, eventList: false };
    scope.init = function () {
        scope.userType = UserService.getUserType();
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
        if (state === 'addEvent') {
            scope.eventsCtrlState.addEvent = true;
            scope.eventsCtrlState.eventList = false;
        } else {
            scope.eventsCtrlState.addEvent = false;
            scope.eventsCtrlState.eventList = true;
        }
    }
    scope.init();
}])