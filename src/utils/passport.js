const dotenv=require('dotenv')
dotenv.config()
const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20').Strategy
const LocalStrategy=require('passport-local')
const {hashPassword,comparePassword}=require('./bcrypt')

const User=require('../models/user')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id)
        .then(user=>{
            done(null,user)
        })
})


passport.use(new GoogleStrategy({
    clientID: process.env.googleClient,
    clientSecret: process.env.googleSecret,
    callbackURL: 'http://localhost:8080/google/login',
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                console.log(`User exists: ${profile}`);
                done(null, existingUser);
            } else {
                new User({
                    googleId: profile.id,
                    email: profile._json.email
                }).save()
                    .then((user) => {
                        req.login(user, (err) => { 
                            if (err) {
                                console.log(err);
                                return done(err);
                            }
                            done(null, user);
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        done(err);
                    });
            }
        })
        .catch((err) => {
            console.log(err);
            done(err);
        });
}));

passport.use('login', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    const user = await User.findOne({ email: username });
    if (!user) {
        return done(null, false, { message: 'Invalid Username' });
    }
    const passHash = user.password;
    if (!comparePassword(password, passHash)) {
        return done(null, false, { message: 'Invalid password' });
    } else {
        req.login(user, (err) => {
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    }
}));



passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  }, async (req, username, password, done) => {
    const user = await User.findOne({ email: username });
    if (user) {
      console.log(`User exists: ${username}`);
      return done(null, false);
    }
    
    const hashPass = hashPassword(password);
    const email = username;
    const newUser = new User({ email, password: hashPass });
    await newUser.save();
    
    console.log(`New User: ${newUser}`);
    return done(null, newUser);
  }));
  