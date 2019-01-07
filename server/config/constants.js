module.exports = {
    MONGODB_URI : 'mongodb://localhost:27017/EventManager',
    PORT: 444,
    MONGO_SECRET: 'Mongo_Secret',
    FROM_MAIL:'ghosesoumya001@gmail.com',
    RESET_PASSWORD_URL:'http://localhost:3000/#!/resetPassword',
    RESET_PASSWORD_SUBJECT:'Reset User Password',
    EVENT_PLACE_ADDITION_SUBJECT:'A new place has been added to Event',
    EVENT_INVITATION_ADDITION_TEMPLATE: 'Hey, A new place has been added to the Event',
    APP_REDIRECT_URL: `http://localhost:3000/#!/dashboard/employee/events/listofEvents`,
    MANAGER_EMAIL:'manager@gmail.com'

}