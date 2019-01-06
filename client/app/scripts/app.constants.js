
var constants = {
    SUCCESS_MESSAGE: "Hurray! Successfull",
    ERROR_MESSAGE: "Ooops! an error occured :(",
    API: {
        USER: {
            SIGNIN: 'http://localhost:444/api/v1/account/signin',
            SIGNUP: 'http://localhost:444/api/v1/account/signup',
            RESET_PASSWORD: 'http://localhost:444/api/v1/account/resetPassword'
        },
        EVENT: {
            CREATE_EVENT: 'http://localhost:444/api/v1/event/createEvent',
            PROPOSE_PLACE: 'http://localhost:444/api/v1/event/proposePlace',
            FINALIZE_LOCATION:'http://localhost:444/api/v1/event/proposePlace',
            EVENT_LIST:'http://localhost:444/api/v1/event/getEvents'
        }

    }
}

app.constant('APP_CONSTANTS', constants);