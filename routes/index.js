var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

//Pagina de entrada
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

//Definición de rutas de /quizes
router.get('/quizes', quizController.index)
/*GET question page*/
router.get('/quizes/:quizId(\\d+)', quizController.show);
/*GET answer page*/
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

//Página de author
/*GET author page*/
router.get('/author', function(req, res) {
  res.render('author');
});

module.exports = router;
