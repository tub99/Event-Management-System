const Router = require('express').Router;
const routes = Router();
const eventCtrl = require('../../controllers/event');

routes.post('/createEvent', eventCtrl.createEvent);
routes.put('/proposePlace', eventCtrl.proposePlace);
routes.put('/finalize', eventCtrl.finalizeEvent);
routes.get('getEventById/:eventId', eventCtrl.getEventById);
routes.get('/getEvents', eventCtrl.getEvents);
module.exports = routes;