 // app/routes.js
var controller = require('./controller');

module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        app.route('/api/formula/:formulaId')
            .get(controller.show)
            .put(controller.update)
            .delete(controller.destroy);

        // sample api route
        app.route('/api/formulas')
            .get(controller.all)
            .post(controller.create);
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

        app.param('formulaId', controller.formula);
    };