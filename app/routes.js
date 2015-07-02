 // app/routes.js
var formula = require('./controllers/formulaController');
var notesheet = require('./controllers/notesheetController');
var user = require('./controllers/userController');

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

        app.route('/api/user/:userId')
            .get(user.show)
            .put(user.update)
            .delete(user.destroy);

        // sample api route
        app.route('/api/users')
            .get(user.all)
            .post(user.create);
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

        app.param('formulaId', formula.formula);
        app.param('notesheetId', notesheet.notesheet);       
        app.param('userId', user.user);
    };

