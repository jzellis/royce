var controllers = require('../controllers'),
bcrypt = require('bcrypt'),
Royce = require('../royce');

module.exports = [{
	method: "GET",
	path: "/",
	handler: function (request, reply) {
        reply.file('index.html');
	}
	},
{
method: 'GET',
path: '/{param*}',
handler: {
    directory: {
        path: '../public'
    }
	}
},

{
	method: 'POST',
	path: '/api/users/register',
	handler: function(request, reply){
		msg = {};
		newUser = {
			profile:{},
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
			lastLogin: new Date()
		};
		newUser.username = request.payload.username;
		newUser.email = request.payload.email;
		if(typeof request.payload.first != 'undefined') newUser.profile.firstName = request.payload.first;
		if(typeof request.payload.last != 'undefined') newUser.profile.lastName = request.payload.last;

		var jzellis = new Royce.User(newUser);
		jzellis.password = jzellis.generateHash(request.payload.password);
		Royce.User.findOne({username: request.payload.username}, function(e,user){
			if(!user){
				jzellis.save(function(err){
				});
				msg.status = "200";
				msg.message = "User added";
				msg.user = {
					_id: jzellis._id,
					username: jzellis.username,
					profile: jzellis.profile};
			}else{
				msg.status = "409";
				msg.message = "User exists!";
			}
			reply(msg);
		});
	}
},

{
	method: "POST",
	path: "/api/login",
	handler: function(request,reply){
		msg = {};
				Royce.User.login(request.payload.username,request.payload.password,function(error,user){
			if(error){
				msg.error = error.toString();
				msg.user = null;
			}else{
				msg.error = null;
				msg.user = {
					_id: user._id,
					username: user.username,
					profile: user.profile,
					lastLogin: user.lastLogin
				};
			}
			reply(msg);
		});
		}
}

];