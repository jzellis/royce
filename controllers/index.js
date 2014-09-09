  var faker = require('faker'),
  Royce = require('../royce'),
  helpers = require('../helpers');
exports.helloWorld = function(request, reply){
	
	reply({hello: "World"});
}

exports.posts = function(request, reply){

	posts = [{
		user: faker.Internet.userName(),
		body: helpers.nl2br(faker.Lorem.paragraphs(4))
	}];
	reply(posts);

}

exports.login = function(username, password){
msg = {};
		// Royce.User.login(username,password,function(error,user){
		// 	if(error){
		// 		msg.error = error;
		// 	}else{
		// 		msg.user = user;
		// 	}
		// 	return(msg);
		// });

}