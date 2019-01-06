var userManager = {
    userType: "manager",
    email: 'manager@y.com',
    pass: 'abcd'
},
    userEmployee = {
        userType: "employee",
        email: 'emp@y.com',
        pass: 'abcd'
    },
    eventResp = {
        "status": "1",
        "result": {
            "message": "Events found successfully!",
            "data": [
                {
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
                }
            ]
        }
    },
    events =[{
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
