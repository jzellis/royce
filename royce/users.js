var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
userSchema = new mongoose.Schema({ 
	username: String,
	email: String,
	password: String,
	profile: mongoose.Schema.Types.Mixed,
	createdAt: Date,
	updatedAt: Date,
	deletedAt: Date,
	lastLogin: Date,
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.statics.login = function(username,password,cb){

this.findOne({username: username}, function(e,user){
	if(user){
	if(bcrypt.compareSync(password, user.password)){
	cb(null,user);
}else{
	cb(new Error('Invalid password'),undefined);
}
}else{
	cb(new Error('invalid user',undefined));
}
});

};

module.exports = mongoose.model('User',userSchema);