// db.js
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	email: String,
  password: String,
  profile: ProfileSchema,
});

const ProfileSchema = new mongoose.Schema({
	user: UserSchema,
  image: String,
  questions: [Question],
});

const QuestionSchema = new mongoose.Schema({
	label: String,
  options: [Object]
});

mongoose.connect(dbconf, {useNewUrlParser: true, useUnifiedTopology: true, } )
mongoose.model('User', UserSchema);
mongoose.model('Profile', ProfileSchema);
mongoose.model('Question', QuestionSchema);
