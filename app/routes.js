 // app/routes.js
var formula = require('./formulaController');
var notesheet = require('./notesheetController');

module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        app.route('/api/formula/:formulaId')
            .get(formula.show)
            .put(formula.update)
            .delete(formula.destroy);

        // sample api route
        app.route('/api/formulas')
            .get(formula.all)
            .post(formula.create);
        // route to handle delete goes here (app.delete)

        app.route('/api/notesheet/:notesheetId')
            .get(notesheet.show)
            .put(notesheet.update)
            .delete(notesheet.destroy);

        // sample api route
        app.route('/api/notesheets')
            .get(notesheet.all)
            .post(notesheet.create);
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

        app.param('formulaId', formula.formula);
        app.param('notesheetId', notesheet.notesheet);
    };