
var constants = {
    SUCCESS_MESSAGE: 'Successful!',
    ERROR_MESSAGE: 'Ooops! an error occured.',
    LOGIN_SUCCESS:' Login Successful.',
    LOGIN_ERROR: 'Login Error!',
    ADD_EMPLOYEE_SUCCESS:'Successfully added Employee',
    ADD_EMPLOYEE_ERROR: 'Employee Could not be added',
    PROPOSE_PLACE_SUCCESS: 'Proposed Location Added!',
    FINALIZE_LOCATION_SUCCESS:'Location Finalized',
    routes: {
        LIST_OF_EVENTS: 'listofEvents',
        ADD_EVENT: 'addEvents'
    },
    API: {
        USER: {
            SIGNIN: 'http://localhost:444/api/v1/account/signin',
            SIGNUP: 'http://localhost:444/api/v1/account/signup',
            RESET_PASSWORD: 'http://localhost:444/api/v1/account/resetPassword'
        },
        EVENT: {
            CREATE_EVENT: 'http://localhost:444/api/v1/event/createEvent',
            PROPOSE_PLACE: 'http://localhost:444/api/v1/event/proposePlace',
            FINALIZE_LOCATION: 'http://localhost:444/api/v1/event/finalize',
            EVENT_LIST: 'http://localhost:444/api/v1/event/getEvents'
        }

    }
}

app.constant('APP_CONSTANTS', constants);