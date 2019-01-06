app.controller('eventsCtrl', ['$scope', '$state', 'UserService', function (scope, $state, UserService) {
    scope.eventsCtrlState = { addEvent: true, eventList: false };
    scope.init = function () {
        scope.userType = UserService.getUserType();
        switch (scope.userType) {
            case 'manager':
                $state.go('.addEvents').catch(routeerErrHandler);
                scope.setActiveEventCtrlState('addEvent');
                break;
            case 'employee':
                $state.go('.listofEvents').catch(routeerErrHandler);
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

    function routeerErrHandler(err) {
        if (err)
            $state.go('404');
    }
    scope.init();
}])