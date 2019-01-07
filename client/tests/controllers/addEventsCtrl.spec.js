describe('addEventsCtrl test ->', function () {
    var loginCtrl, $scope, $rootScope, constants;

    beforeEach(angular.mock.module('eventManagementApp'));
    beforeEach(inject(function (_APP_CONSTANTS_, _EventsService_) {
        constants = _APP_CONSTANTS_;
        EventsService = _EventsService_;
    }));
    beforeEach(inject(function ($injector) {

        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        function createController() {
            return $controller('addEventsCtrl', { $scope: $scope })
        };
        $scope = $rootScope.$new();
        addEventsCtrl = createController();
    }));


    it('should exist', function () {
        expect(addEventsCtrl).toBeDefined();
    });
    it('should test addAnEvent', function () {
        $scope.evName = "new event";
        var evData = { eventName: $scope.evName, proposedPlaces: [] }
        spyOn(window, 'swal');
        spyOn(EventsService, "addEvent").and.returnValue({ then: function (data) { return { catch: function (err) { } } } });
        $scope.addAnEvent();
        expect(EventsService.addEvent).toHaveBeenCalledWith(evData)
    });

});