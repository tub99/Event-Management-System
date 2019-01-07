# Event-Management-System
A website for helping Managers to decide where to go for lunch with team.

Description:
A website for helping Managers to decide where to go for lunch with team. Team members
can suggest a place, and that place will appear in a list. Manager can finalize a place by
clicking on a 'Finalize' button. After finalizing, every team member should get an email
notification.

Run Mongo Server
----------------
If mongodb already installed and path is set.
1. For windows users can directly click on mongod.exe and start the server.
2. Opening command propmt and running "mongod" will also start the server.
$ mongod

Seeding database
----------------
$ npm install -g node-mongo-seeds

Go inside /server directory:
From your terminal inside /server run "seed"

 $ seed
 
 Example:
 manager seeded data: {
    "email" : "manager@gmail.com",
    "password" : "manager@1234",
    "name" : "manager_soumya",
    "type" : "manager"
}
 
Running Backend Server
---------------------
 Go inside /server directory:
 From your terminal inside /server run "npm start"
 $ npm start
 
Running Client
--------------
 Go inside /client directory:
 From your terminal inside /client run "npm start"
 $ npm start
 
 This installs all dependencies, creates the build 
 and runs the build on server: http://localhost:3000 
 
 To run test cases
 $ npm run test
 
 Goto your browser: in the url run http://localhost:3000
 You should be able to see the login screen and login as manager
 

 