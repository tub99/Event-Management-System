app.service("UserService", function () {
    this.userData = null;
    this.addCurrentUser = function (data) {
        this.userData = data;
    }
    this.getUserType = function () {
        return this.getUserFromStorage().userType;
    }

    this.addUserToStorage = function(userData){
        localStorage.setItem('user', JSON.stringify(userData))
    }

    this.getUserFromStorage = function(){
        var userData = JSON.parse(localStorage.getItem('user'));
        return userData;
    }

    this.removeUserFromStorage = function(){
        this.userData = null;
        return localStorage.removeItem('user');
    }
});