 // app/routes.js
var controller = require('./controller');

module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        app.get('/api/formula/:formulaId', function(req, res){
            controller.show(req, res);
        });
        // sample api route
        app.get('/api/formulas', function(req, res) {
            // use mongoose to get all Formulas in the database
            controller.all(req, res);
        });

        // route to handle creating goes here (app.post)

        app.post('/api/formulas', function(req, res){
            controller.create(req, res);
        })
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

        app.param('formulaId', controller.formula);
    };