app.service("UserService", function () {
    this.userData = null;
    this.addCurrentUser = function (data) {
        this.userData = data;
    }
    this.getUserType = function () {
        var type = this.getUserFromStorage() ? this.getUserFromStorage().userType : '';
        return type;
    }

    //adds current user data to localStorage
    this.addUserToStorage = function (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
    }
    //pulls current user data from localStorage
    this.getUserFromStorage = function () {
        var userData = JSON.parse(localStorage.getItem('user'));
        return userData;
    }
    //removes current user data from localStorage
    this.removeUserFromStorage = function () {
        this.userData = null;
        return localStorage.removeItem('user');
    }
});