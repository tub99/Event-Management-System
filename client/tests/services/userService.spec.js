describe('UserService service test ->', function () {
    var UserService, modelData = { email: 'abc@y.com', password: 'pass' };


    beforeEach(angular.mock.module('eventManagementApp'));


    beforeEach(inject(function (_UserService_) {
        UserService = _UserService_;
    }));

    // A simple test to verify the UserService factory exists
    it('should exist', function () {
        expect(UserService).toBeDefined();
    });
    it('should addCurrentUser', function () {
        UserService.addCurrentUser(modelData);
        expect(UserService.userData).toBe(modelData);
    });
    it('should addUserToStorage and getUserFromStorage', function () {
        UserService.addUserToStorage(modelData);
        expect(UserService.getUserFromStorage()).toEqual(modelData);
    });
    it('should removeUserFromStorage', function () {
        UserService.removeUserFromStorage();
        expect(UserService.userData).toBe(null);
    });
});