var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller')

//Pagina de entrada
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {errors:[]});
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

//Definición de rutas de sesión
router.get('/login', sessionController.new); //formulario de login
router.post('/login', sessionController.create); // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión

//Definición de rutas de /quizes
router.get('/quizes', quizController.index)
/*GET question page*/
router.get('/quizes/:quizId(\\d+)', quizController.show);
/*GET answer page*/
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
/*GET new quiz form page*/
router.get('/quizes/new', quizController.new);
/*POST create quiz*/
router.post('/quizes/create', quizController.create);
/*GET edit form page*/
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
/*PUT edit quiz*/
router.put('/quizes/:quizId(\\d+)', quizController.update)
/*DELETE quiz*/
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

//Definición de rutas para los comentarios /quizes/.../comments/...
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);


//Página de author
/*GET author page*/
router.get('/author', function(req, res) {
  res.render('author' , {quiz: req.quiz, errors:[]});
});

module.exports = router;
