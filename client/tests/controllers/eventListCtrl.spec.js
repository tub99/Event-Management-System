describe('eventListCtrl test ->', function () {
    var eventListCtrl, $scope, $rootScope, constants, UserService;

    beforeEach(angular.mock.module('eventManagementApp'));
    beforeEach(inject(function (_UserService_, _APP_CONSTANTS_) {
        constants = _APP_CONSTANTS_;
        UserService = _UserService_;
    }));
    beforeEach(inject(function ($injector) {

        $httpBackend = $injector.get('$httpBackend');
        successRespEvntProposal = successRespEvntFinalise = { status: '1', result: { message: 'success' } };
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        function createController() {
            return $controller('eventListCtrl', { $scope: $scope })
        };
        $scope = $rootScope.$new();
        eventListCtrl = createController();
        $scope.eventList = [{
            "_id": "5c311b71759b3f1fb0524020",
            "updatedAt": "2019-01-05T21:09:33.788Z",
            "createdAt": "2019-01-05T21:02:44.010Z",
            "eventName": "puja outing",
            "__v": 0,
            "isFinalized": false,
            "proposedPlaces": [
                {
                    "_id": "5c311c83c072fb4964463fb0",
                    "address": "22 rajani sen",
                    "locationName": "Howrah"
                },
                {
                    "_id": "5c311cf5c072fb4964463fb1",
                    "address": "45/a hjfd",
                    "locationName": "Ruby"
                },
                {
                    "_id": "5c311d0dc072fb4964463fb2",
                    "address": "12/e science city",
                    "locationName": "JW marriot"
                }
            ]
        },
        {
            "_id": "5c311e0404afc84baccf63b4",
            "updatedAt": "2019-01-05T21:19:38.387Z",
            "createdAt": "2019-01-05T21:13:43.713Z",
            "eventName": "picnic",
            "__v": 0,
            "finalizedLocationId": "5c311e3104afc84baccf63b6",
            "isFinalized": true,
            "proposedPlaces": [
                {
                    "_id": "5c311e2004afc84baccf63b5",
                    "address": "12/e science city",
                    "locationName": "JW marriot"
                },
                {
                    "_id": "5c311e3104afc84baccf63b6",
                    "address": "1/9 ruby",
                    "locationName": "Gateway"
                }
            ]
        }];
        successRespEvnt = { status: '1', result: { message: 'success', data: $scope.eventList } };
    }));


    it('should exist', function () {
        expect(eventListCtrl).toBeDefined();
    });
    it('should test onEventSelect', function () {
        $scope.onEventSelect($scope.eventList[0]);
        expect($scope.eventList[0].isActive).toEqual(true);
        expect($scope.selectedEvent).toEqual($scope.eventList[0]);
    });

    it('should test selectPlace', function () {
        $scope.selectPlace($scope.eventList[0].proposedPlaces[0]);
        expect($scope.proposedPlace).toEqual($scope.eventList[0].proposedPlaces[0])
    });

    it('should test proposeLocation', function () {
        spyOn(window, 'swal');
        $scope.location = 'BBQ';
        $scope.address = 'sector5,satlake';
        UserService.addUserToStorage({ userId: 'abc' });
        $scope.selectedEvent = $scope.eventList[0];
        $httpBackend.when('PUT', constants.API.EVENT.PROPOSE_PLACE + '?eventId=' + $scope.selectedEvent._id)
            .respond(200, successRespEvntProposal);
        $httpBackend.when('GET', constants.API.EVENT.EVENT_LIST)
            .respond(200, successRespEvntProposal);
        $httpBackend.expectGET(constants.API.EVENT.EVENT_LIST)
        $scope.proposeLocation();
        $httpBackend.flush();
        expect(swal).toHaveBeenCalledWith('success', '', 'success');
    });

    it('should test finalizeLocation', function () {
        spyOn(window, 'swal');
        $scope.location = 'BBQ';
        $scope.address = 'sector5,satlake';
        UserService.addUserToStorage({ userId: 'abc' });
        $scope.selectedEvent = $scope.eventList[0];
        $scope.proposedPlace = $scope.selectedEvent;
        $httpBackend.when('PUT', constants.API.EVENT.FINALIZE_LOCATION + '?eventId=' + $scope.selectedEvent._id + '&locId=' + $scope.proposedPlace._id)
            .respond(200, successRespEvntFinalise);
        $httpBackend.when('GET', constants.API.EVENT.EVENT_LIST)
            .respond(200, successRespEvnt);
        $httpBackend.expectGET(constants.API.EVENT.EVENT_LIST)
        $scope.finalizeLocation();
        $httpBackend.flush();
        expect(swal).toHaveBeenCalledWith('success', '', 'success');
    });




});