var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/*GET question page*/
router.get('/quizes/question', quizController.question);

/*GET answer page*/
router.get('/quizes/answer', quizController.answer);

/*GET author page*/
router.get('/author', function(req, res) {
  res.render('author', { title: 'Author' });
});

module.exports = router;
