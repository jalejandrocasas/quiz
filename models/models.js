var path = require('path');

//Postgres DATABASE_URL = postgres://user:passwd@host:port/database
//SQlite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6] || null);
var user     = (url[2] || null);
var pwd      = (url[3] || null);
var protocol = (url[1] || null);
var dialect  = (url[1] || null);
var port     = (url[5] || null);
var host     = (url[4] || null);
var storage  = process.env.DATABSE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
	{	dialect:  protocol, 
		protocol: protocol,
		port: 	  port,
		host:     host,
		storage:  storage, //solo SQlite (.env)
		omitNull: true    //solo Postgres
	}
);

//Importar la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);


//Asociaciones entre las tablas Quiz y Comments 1-a-N
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//Exportar tablas
exports.Quiz = Quiz; //Exportar la definición de la tabla Quiz
exports.Comment = Comment; //Exportar la definición de la tabla Comment

//sequelize.sync() crea e inicializa la tabla de preguntas en la BD
sequelize.sync().then(function(){
	//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count === 0){ //si la tabla está vacía se inicializa
			Quiz.bulkCreate([{
					pregunta: 'Capital de Italia',
					respuesta: 'Roma',
					tema: 'otro'
				}, {
					pregunta: 'Capital de Portugal',
					respuesta: 'Lisboa',
					tema: 'otro'
				}])
				.then(function() {
					console.log('Base de datos inicializada');
				});
		}
	});
});