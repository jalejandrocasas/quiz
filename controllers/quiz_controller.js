//GET /quizes/question
exports.question = function(req, res){
	res.render('quizes/question' , {pregunta: 'Capital de Italia', title: 'Pregunta'});
}

//GET /quizes/answer
exports.answer = function(req, res){
	if(req.query.respuesta === 'Roma'){
		res.render('quizes/answer' , {respuesta: 'Correcto', title: 'Repuesta'});
	} else {
		res.render('quizes/answer' , {respuesta: 'Incorrecto', title: 'Repuesta'});	
	}
}