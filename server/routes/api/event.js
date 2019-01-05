const Router = require('express').Router;
const routes = Router();
const eventCtrl = require('../../controllers/event');

routes.post('/createEvent', eventCtrl.createEvent);
routes.post('/proposePlace/:eventId', eventCtrl.proposePlace);
routes.post('/finalize/:eventId', eventCtrl.finalizeEvent);
routes.get('getEventById/:eventId', eventCtrl.getEventById);
routes.get('/getEvents', eventCtrl.getEvents);
module.exports = routes;