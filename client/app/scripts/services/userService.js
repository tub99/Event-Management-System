app.service("UserService", function () {
    this.userData = {};
    this.addCurrentUser = function (data) {
        this.userData = data;
    }
    this.getUserType = function () {
        return this.userData.userType;
    }
});