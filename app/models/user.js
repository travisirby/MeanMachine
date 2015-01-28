var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, index: { unique: true}},
    password: { type: String, required: true, select: false}
});

// hash the password before saving the user
UserSchema.pre('save', function(next){
    var user = this;
    // only hash the password if it has changed or the user is new
    if (!user.isModified('password')) return next();
    //generate the hash
    bcrypt.hash(user.password, null, null, function(err, hash){
        if (err) return next(err);
        // change the password to the hashed version
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);