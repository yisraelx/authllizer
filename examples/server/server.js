/**
 * Authllizer Node.js Example
 * (c) 2015 Sahat Yalkabov
 * License: MIT
 */

var path = require('path');
var qs = require('querystring');

require('colors');
require('es6-promise');

var async = require('async');
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
var request = require('request');

var config = require('./config');

var providers = ['bitbucket', 'facebook', 'github', 'google', 'instagram', 'linkedin', 'live', 'reddit', 'spotify', 'twitch', 'twitter', 'vk', 'wordpress', 'yahoo'];

var userSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, trim: true},
    password: {type: String, select: false},
    displayName: String,
    picture: String,
    bitbucket: String,
    facebook: String,
    foursquare: String,
    github: String,
    google: String,
    instagram: String,
    linkedin: String,
    live: String,
    reddit: String,
    spotify: String,
    twitch: String,
    twitter: String,
    vk: String,
    wordpress: String,
    yahoo: String
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};

var User = mongoose.model('User', userSchema);

/*
 |--------------------------------------------------------------------------
 | Connect to mongodb
 |--------------------------------------------------------------------------
 */
mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(function () {
        console.log(('Mongoose successfully connected to MongoDB ' + config.mongoURI).yellow);
    })
    .catch(function (err) {
        console.log(('Error: Mongoose fail to connect to ' + config.mongoURI).red);
        console.log('Did you forget to set MONGO_URI or run `mongod`?'.blue);
    });

var app = express();

app.set('port', config.port);
app.set('host', config.host);
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
    app.use(function (req, res, next) {
        var protocol = req.get('x-forwarded-proto');
        protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}

/*
 |--------------------------------------------------------------------------
 | Sign in Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
        payload = jwt.decode(token, config.tokenSecret);
    } catch (err) {
        return res.status(401).send({message: err.message});
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({message: 'Token has expired'});
    }
    req.user = payload.sub;
    next();
}

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.tokenSecret);
}

/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
app.get('/api/me', ensureAuthenticated, function (req, res) {
    User.findById(req.user, function (err, user) {
        if (!user) {
            return res.status(400).send({message: 'User not found'});
        }
        res.send(user);
    });
});

/*
 |--------------------------------------------------------------------------
 | PUT /api/me
 |--------------------------------------------------------------------------
 */
app.put('/api/me', ensureAuthenticated, function (req, res) {
    User.findById(req.user, function (err, user) {
        if (!user) {
            return res.status(400).send({message: 'User not found'});
        }

        User.findOne({email: req.body.email}).then(function (existingUser) {
            if (req.body.email && user.email !== req.body.email && existingUser) {
                return res.status(409).send({message: 'This email is already linked to another account.'});
            }

            user.displayName = req.body.displayName || user.displayName;
            user.email = req.body.email || user.email;
            user.save(function (err) {
                res.status(200).end();
            });
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Email
 |--------------------------------------------------------------------------
 */
app.post('/auth/signin', function (req, res) {
    User.findOne({email: req.body.email}, '+password', function (err, user) {
        if (!user) {
            return res.status(401).send({message: 'Invalid email and/or password'});
        }
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({message: 'Invalid email and/or password'});
            }
            res.send({access_token: createJWT(user)});
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Create Email and Password Account
 |--------------------------------------------------------------------------
 */
app.post('/auth/signup', function (req, res) {
    User.findOne({email: req.body.email}, function (err, existingUser) {
        if (existingUser) {
            return res.status(409).send({message: 'Email is already taken'});
        }
        var user = new User({
            displayName: req.body.displayName,
            email: req.body.email,
            password: req.body.password
        });
        user.save(function (err, result) {
            if (err) {
                res.status(500).send({message: err.message});
            }
            res.send({access_token: createJWT(result)});
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sing out
 |--------------------------------------------------------------------------
 */
app.post('/auth/signout', ensureAuthenticated, function (req, res) {
    res.send({message: 'Goodbye!'});
});

/*
 |--------------------------------------------------------------------------
 | Refresh access token
 |--------------------------------------------------------------------------
 */
app.post('/auth/refresh', ensureAuthenticated, function (req, res) {
    var user = req.user;
    var token = createJWT(user);
    res.send({access_token: token});
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Bitbucket
 |--------------------------------------------------------------------------
 */
app.post('/auth/bitbucket', function (req, res) {
    var accessTokenUrl = 'https://bitbucket.org/site/oauth2/access_token';
    var userApiUrl = 'https://bitbucket.org/api/2.0/user';
    var emailApiUrl = 'https://bitbucket.org/api/2.0/user/emails';

    var headers = {
        Authorization: 'Basic ' + new Buffer(req.body.client_id + ':' + config.bitbucketClientSecret).toString('base64')
    };

    var formData = {
        code: req.body.code,
        redirect_uri: req.body.redirect_uri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post({url: accessTokenUrl, form: formData, headers: headers, json: true}, function (err, response, body) {
        if (body.error) {
            return res.status(400).send({message: body.error_description});
        }

        var params = {
            access_token: body.access_token
        };

        // Step 2. Retrieve information about the current user.
        request.get({url: userApiUrl, qs: params, json: true}, function (err, response, profile) {

            // Step 2.5. Retrieve current user's email.
            request.get({url: emailApiUrl, qs: params, json: true}, function (err, response, emails) {
                var email = emails.values[0].email;

                // Step 3a. Link user accounts.
                if (req.header('Authorization')) {
                    User.findOne({bitbucket: profile.uuid}, function (err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({message: 'There is already a Bitbucket account that belongs to you'});
                        }
                        var token = req.header('Authorization').split(' ')[1];
                        var payload = jwt.decode(token, config.tokenSecret);
                        User.findById(payload.sub, function (err, user) {
                            if (!user) {
                                return res.status(400).send({message: 'User not found'});
                            }
                            user.bitbucket = profile.uuid;
                            user.picture = user.picture || profile.links.avatar.href;
                            user.displayName = user.displayName || profile.display_name;
                            user.save(function () {
                                var token = createJWT(user);
                                res.send({access_token: token});
                            });
                        });
                    });
                } else {
                    // Step 3b. Create a new user account or return an existing one.
                    User.findOne({bitbucket: profile.id}, function (err, existingUser) {
                        if (existingUser) {
                            var token = createJWT(existingUser);
                            return res.send({access_token: token});
                        }
                        var user = new User();
                        user.bitbucket = profile.uuid;
                        user.picture = profile.links.avatar.href;
                        user.displayName = profile.display_name;
                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                }
            });
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Facebook
 |--------------------------------------------------------------------------
 */
app.post('/auth/facebook', function (req, res) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v4.0/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v4.0/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.client_id,
        client_secret: config.facebookClientSecret,
        redirect_uri: req.body.redirect_uri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({url: accessTokenUrl, qs: params, json: true}, function (err, response, accessToken) {
        if (response.statusCode !== 200) {
            return res.status(500).send({message: accessToken.error.message});
        }

        // Step 2. Retrieve profile information about the current user.
        request.get({url: graphApiUrl, qs: accessToken, json: true}, function (err, response, profile) {
            if (response.statusCode !== 200) {
                return res.status(500).send({message: profile.error.message});
            }
            if (req.header('Authorization')) {
                User.findOne({facebook: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a Facebook account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.facebook = profile.id;
                        user.picture = user.picture || 'https://graph.facebook.com/v4.0/' + profile.id + '/picture?type=large';
                        user.displayName = user.displayName || profile.name;
                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3. Create a new user account or return an existing one.
                User.findOne({facebook: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        var token = createJWT(existingUser);
                        return res.send({access_token: token});
                    }
                    var user = new User();
                    user.facebook = profile.id;
                    user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.displayName = profile.name;
                    user.save(function () {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Foursquare
 |--------------------------------------------------------------------------
 */
app.post('/auth/foursquare', function (req, res) {
    var accessTokenUrl = 'https://foursquare.com/oauth2/access_token';
    var profileUrl = 'https://api.foursquare.com/v2/users/self';
    var formData = {
        code: req.body.code,
        client_id: req.body.client_id,
        client_secret: config.foursquareClientSecret,
        redirect_uri: req.body.redirect_uri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post({url: accessTokenUrl, form: formData, json: true}, function (err, response, body) {
        var params = {
            v: '20140806',
            oauth_token: body.access_token
        };

        // Step 2. Retrieve information about the current user.
        request.get({url: profileUrl, qs: params, json: true}, function (err, response, profile) {
            profile = profile.response.user;

            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({foursquare: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a Foursquare account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.foursquare = profile.id;
                        user.picture = user.picture || profile.photo.prefix + '300x300' + profile.photo.suffix;
                        user.displayName = user.displayName || profile.firstName + ' ' + profile.lastName;
                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({foursquare: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        var token = createJWT(existingUser);
                        return res.send({access_token: token});
                    }
                    var user = new User();
                    user.foursquare = profile.id;
                    user.picture = profile.photo.prefix + '300x300' + profile.photo.suffix;
                    user.displayName = profile.firstName + ' ' + profile.lastName;
                    user.save(function () {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with GitHub
 |--------------------------------------------------------------------------
 */
app.post('/auth/github', function (req, res) {
    var accessTokenUrl = 'https://github.com/login/oauth/access_token';
    var userApiUrl = 'https://api.github.com/user';
    var params = {
        code: req.body.code,
        client_id: req.body.client_id,
        client_secret: config.githubClientSecret,
        redirect_uri: req.body.redirect_uri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({url: accessTokenUrl, qs: params}, function (err, response, accessToken) {
        accessToken = qs.parse(accessToken);
        var headers = {'User-Agent': 'Authllizer'};

        // Step 2. Retrieve profile information about the current user.
        request.get({
            url: userApiUrl,
            qs: accessToken,
            headers: headers,
            json: true
        }, function (err, response, profile) {

            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({github: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a GitHub account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.github = profile.id;
                        user.picture = user.picture || profile.avatar_url;
                        user.displayName = user.displayName || profile.name;
                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({github: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        var token = createJWT(existingUser);
                        return res.send({access_token: token});
                    }
                    var user = new User();
                    user.github = profile.id;
                    user.picture = profile.avatar_url;
                    user.displayName = profile.name;

                    user.save(function () {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Google
 |--------------------------------------------------------------------------
 */
app.post('/auth/google', function (req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/userinfo/v2/me';
    var params = {
        code: req.body.code,
        client_id: req.body.client_id,
        client_secret: config.googleClientSecret,
        redirect_uri: req.body.redirect_uri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {json: true, form: params}, function (err, response, token) {
        var accessToken = token.access_token;
        var headers = {Authorization: 'Bearer ' + accessToken};

        // Step 2. Retrieve profile information about the current user.
        request.get({url: peopleApiUrl, headers: headers, json: true}, function (err, response, profile) {
            if (profile.error) {
                return res.status(500).send({message: profile.error.message});
            }
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({google: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a Google account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.google = profile.id;
                        user.picture = user.picture || (profile.picture && (profile.picture + '=s200'))
                        user.displayName = user.displayName || profile.name;
                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({google: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.send({access_token: createJWT(existingUser)});
                    }
                    var user = new User();
                    user.google = profile.id;
                    user.picture = profile.picture && (profile.picture + '=s200');
                    user.displayName = profile.name;
                    user.save(function (err) {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
|--------------------------------------------------------------------------
| Sign in with Instagram
|--------------------------------------------------------------------------
*/
app.post('/auth/instagram', function (req, res) {
    var accessTokenUrl = 'https://api.instagram.com/oauth/access_token';

    var params = {
        client_id: req.body.client_id,
        redirect_uri: req.body.redirect_uri,
        client_secret: config.instagramClientSecret,
        code: req.body.code,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post({url: accessTokenUrl, form: params, json: true}, function (error, response, body) {

        // Step 2a. Link user accounts.
        if (req.header('Authorization')) {
            User.findOne({instagram: body.user.id}, function (err, existingUser) {
                if (existingUser) {
                    return res.status(409).send({message: 'There is already an Instagram account that belongs to you'});
                }

                var token = req.header('Authorization').split(' ')[1];
                var payload = jwt.decode(token, config.tokenSecret);

                User.findById(payload.sub, function (err, user) {
                    if (!user) {
                        return res.status(400).send({message: 'User not found'});
                    }
                    user.instagram = body.user.id;
                    user.picture = user.picture || body.user.profile_picture;
                    user.displayName = user.displayName || body.user.username;
                    user.save(function () {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            });
        } else {
            // Step 2b. Create a new user account or return an existing one.
            User.findOne({instagram: body.user.id}, function (err, existingUser) {
                if (existingUser) {
                    return res.send({access_token: createJWT(existingUser)});
                }

                var user = new User({
                    instagram: body.user.id,
                    picture: body.user.profile_picture,
                    displayName: body.user.username
                });

                user.save(function () {
                    var token = createJWT(user);
                    res.send({access_token: token, user: user});
                });
            });
        }
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with LinkedIn
 |--------------------------------------------------------------------------
 */
app.post('/auth/linkedin', function (req, res) {
    var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
    var peopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-id,last-id,email-address,picture-url)';
    var params = {
        code: req.body.code,
        client_id: req.body.client_id,
        client_secret: config.linkedinClientSecret,
        redirect_uri: req.body.redirect_uri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {form: params, json: true}, function (err, response, body) {
        if (response.statusCode !== 200) {
            return res.status(response.statusCode).send({message: body.error_description});
        }
        var params = {
            oauth2_access_token: body.access_token,
            format: 'json'
        };

        // Step 2. Retrieve profile information about the current user.
        request.get({url: peopleApiUrl, qs: params, json: true}, function (err, response, profile) {

            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({linkedin: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a LinkedIn account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.linkedin = profile.id;
                        user.picture = user.picture || profile.pictureUrl;
                        user.displayName = user.displayName || profile.firstName + ' ' + profile.lastName;
                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({linkedin: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.send({access_token: createJWT(existingUser)});
                    }
                    var user = new User();
                    user.linkedin = profile.id;
                    user.picture = profile.pictureUrl;
                    user.displayName = profile.firstName + ' ' + profile.lastName;
                    user.save(function () {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Windows Live
 |--------------------------------------------------------------------------
 */
app.post('/auth/live', function (req, res) {
    async.waterfall([
        // Step 1. Exchange authorization code for access token.
        function (done) {
            var accessTokenUrl = 'https://login.live.com/oauth20_token.srf';
            var params = {
                code: req.body.code,
                client_id: req.body.client_id,
                client_secret: config.liveClientSecret,
                redirect_uri: req.body.redirect_uri,
                grant_type: 'authorization_code'
            };
            request.post(accessTokenUrl, {form: params, json: true}, function (err, response, accessToken) {
                done(null, accessToken);
            });
        },
        // Step 2. Retrieve profile information about the current user.
        function (accessToken, done) {
            var profileUrl = 'https://apis.live.net/v5.0/me?access_token=' + accessToken.access_token;
            request.get({url: profileUrl, json: true}, function (err, response, profile) {
                done(err, profile);
            });
        },
        function (profile) {
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({live: profile.id}, function (err, user) {
                    if (user) {
                        return res.status(409).send({message: 'There is already a Windows Live account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, existingUser) {
                        if (!existingUser) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        existingUser.live = profile.id;
                        existingUser.displayName = existingUser.displayName || profile.name;
                        existingUser.save(function () {
                            var token = createJWT(existingUser);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user or return an existing account.
                User.findOne({live: profile.id}, function (err, user) {
                    if (user) {
                        return res.send({access_token: createJWT(user)});
                    }
                    var newUser = new User();
                    newUser.live = profile.id;
                    newUser.displayName = profile.name;
                    newUser.save(function () {
                        var token = createJWT(newUser);
                        res.send({access_token: token});
                    });
                });
            }
        }
    ]);
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Reddit
 |--------------------------------------------------------------------------
 */
app.post('/auth/reddit', function (req, res) {
    var tokenUrl = 'https://www.reddit.com/api/v1/access_token';
    var userUrl = 'https://oauth.reddit.com/api/v1/me';

    var params = {
        grant_type: 'authorization_code',
        code: req.body.code,
        redirect_uri: req.body.redirect_uri
    };

    var headers = {
        Authorization: 'Basic ' + new Buffer(req.body.client_id + ':' + config.redditClientSecret).toString('base64')
    };

    request.post(tokenUrl, {json: true, form: params, headers: headers}, function (err, response, body) {

        request.get(userUrl, {
            json: true,
            headers: {Authorization: 'Bearer ' + body.access_token, 'User-Agent': 'Authllizer'}
        }, function (err, response, profile) {
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({reddit: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a Reddit account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.reddit = profile.id;
                        user.displayName = user.displayName || profile.name;
                        user.picture = user.picture || profile.icon_img;

                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({reddit: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.send({access_token: createJWT(existingUser)});
                    }
                    var user = new User({
                        reddit: profile.id,
                        displayName: profile.name,
                        picture: profile.icon_img
                    });

                    user.save(function (err) {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Spotify
 |--------------------------------------------------------------------------
 */
app.post('/auth/spotify', function (req, res) {
    var tokenUrl = 'https://accounts.spotify.com/api/token';
    var userUrl = 'https://api.spotify.com/v1/me';

    var params = {
        grant_type: 'authorization_code',
        code: req.body.code,
        redirect_uri: req.body.redirect_uri
    };

    var headers = {
        Authorization: 'Basic ' + new Buffer(req.body.client_id + ':' + config.spotifyClientSecret).toString('base64')
    };

    request.post(tokenUrl, {json: true, form: params, headers: headers}, function (err, response, body) {
        if (body.error) {
            return res.status(400).send({message: body.error_description});
        }

        request.get(userUrl, {
            json: true,
            headers: {Authorization: 'Bearer ' + body.access_token}
        }, function (err, response, profile) {
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({spotify: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a Spotify account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.spotify = profile.id;
                        user.picture = profile.images.length > 0 ? profile.images[0].url : '';
                        user.displayName = user.displayName || profile.displayName || profile.id;

                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({spotify: profile.id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.send({access_token: createJWT(existingUser)});
                    }
                    var user = new User();
                    user.spotify = profile.id;
                    user.picture = profile.images.length > 0 ? profile.images[0].url : '';
                    user.displayName = profile.displayName || profile.id;

                    user.save(function (err) {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Twitch
 |--------------------------------------------------------------------------
 */
app.post('/auth/twitch', function (req, res) {
    var accessTokenUrl = 'https://api.twitch.tv/kraken/oauth2/token';
    var profileUrl = 'https://api.twitch.tv/kraken/user';
    var formData = {
        code: req.body.code,
        client_id: req.body.client_id,
        client_secret: config.twitchClientSecret,
        redirect_uri: req.body.redirect_uri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post({url: accessTokenUrl, form: formData, json: true}, function (err, response, accessToken) {
        var params = {
            oauth_token: accessToken.access_token
        };

        // Step 2. Retrieve information about the current user.
        request.get({url: profileUrl, qs: params, json: true}, function (err, response, profile) {
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({twitch: profile._id}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a Twitch account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.twitch = profile._id;
                        user.picture = user.picture || profile.logo;
                        user.displayName = user.name || profile.name;

                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({twitch: profile._id}, function (err, existingUser) {
                    if (existingUser) {
                        var token = createJWT(existingUser);
                        return res.send({access_token: token});
                    }
                    var user = new User();
                    user.twitch = profile._id;
                    user.picture = profile.logo;
                    user.displayName = profile.name;

                    user.save(function () {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Twitter
 | Note: Make sure "Request email addresses from users" is enabled
 | under Permissions tab in your Twitter app. (https://apps.twitter.com)
 |--------------------------------------------------------------------------
 */
app.post('/auth/twitter', function (req, res) {
    var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
    var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
    var profileUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json';

    // Part 1 of 2: Initial request from Authllizer.
    if (!req.body.oauth_token || !req.body.oauth_verifier) {
        var requestTokenOauth = {
            consumer_key: config.twitterClientKey,
            consumer_secret: config.twitterClientSecret,
            callback: req.body.callback
        };

        // Step 1. Obtain request token for the authorization window.
        request.post({url: requestTokenUrl, oauth: requestTokenOauth}, function (err, response, body) {
            var oauthToken = qs.parse(body);
            // Step 2. Send OAuth token back to open the authorization screen.
            res.send(oauthToken);
        });
    } else {
        // Part 2 of 2: Second request after Authorize app is clicked.
        var accessTokenOauth = {
            consumer_key: config.twitterClientKey,
            consumer_secret: config.twitterClientSecret,
            token: req.body.oauth_token,
            verifier: req.body.oauth_verifier
        };

        // Step 3. Exchange oauth token and oauth verifier for access token.
        request.post({url: accessTokenUrl, oauth: accessTokenOauth}, function (err, response, accessToken) {

            accessToken = qs.parse(accessToken);

            var profileOauth = {
                consumer_key: config.twitterClientKey,
                consumer_secret: config.twitterClientSecret,
                token: accessToken.oauth_token,
                token_secret: accessToken.oauth_token_secret,
            };

            // Step 4. Retrieve user's profile information and email address.
            request.get({
                url: profileUrl,
                qs: {include_email: true},
                oauth: profileOauth,
                json: true
            }, function (err, response, profile) {

                // Step 5a. Link user accounts.
                if (req.header('Authorization')) {
                    User.findOne({twitter: profile.id}, function (err, existingUser) {
                        if (existingUser) {
                            return res.status(409).send({message: 'There is already a Twitter account that belongs to you'});
                        }

                        var token = req.header('Authorization').split(' ')[1];
                        var payload = jwt.decode(token, config.tokenSecret);

                        User.findById(payload.sub, function (err, user) {
                            if (!user) {
                                return res.status(400).send({message: 'User not found'});
                            }

                            user.twitter = profile.id;
                            user.displayName = user.displayName || profile.name;
                            user.picture = user.picture || profile.profile_image_url_https.replace('_normal', '');

                            user.save(function (err) {
                                res.send({access_token: createJWT(user)});
                            });
                        });
                    });
                } else {
                    // Step 5b. Create a new user account or return an existing one.
                    User.findOne({twitter: profile.id}, function (err, existingUser) {
                        if (existingUser) {
                            return res.send({access_token: createJWT(existingUser)});
                        }

                        var user = new User();
                        user.twitter = profile.id;
                        user.displayName = profile.name;
                        user.picture = profile.profile_image_url_https.replace('_normal', '');

                        user.save(function () {
                            res.send({access_token: createJWT(user)});
                        });
                    });
                }
            });
        });
    }
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Vk
 |--------------------------------------------------------------------------
 */
app.post('/auth/vk', function (req, res) {
    var tokenUrl = 'https://oauth.vk.com/access_token';
    var userUrl = 'https://api.vk.com/method/users.get';

    var params = {
        client_id: req.body.client_id,
        redirect_uri: req.body.redirect_uri,
        client_secret: config.vkClientSecret,
        code: req.body.code,
        grant_type: 'authorization_code'
    };

    request.post(tokenUrl, {json: true, form: params}, function (err, response, body) {
        var fields = ['uid', 'first_name', 'last_name', 'photo'];
        request.get(userUrl, {
            qs: {fields: fields},
            json: true,
            headers: {Authorization: 'Bearer ' + body.access_token}
        }, function (err, response, profile) {
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({vk: profile.uid}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a Vk account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.vk = profile.uid;
                        user.picture = user.picture || profile.photo;
                        user.displayName = user.displayName || profile.first_name + ' ' + profile.last_name;

                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({vk: profile.uid}, function (err, existingUser) {
                    if (existingUser) {
                        return res.send({access_token: createJWT(existingUser)});
                    }
                    var user = new User({
                        vk: profile.uid,
                        picture: profile.photo,
                        displayName: profile.first_name + ' ' + profile.last_name
                    });

                    user.save(function (err) {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Wordpress
 |--------------------------------------------------------------------------
 */
app.post('/auth/wordpress', function (req, res) {
    var tokenUrl = 'https://public-api.wordpress.com/oauth2/token';
    var userUrl = 'https://public-api.wordpress.com/rest/v1/me';

    var params = {
        client_id: req.body.client_id,
        redirect_uri: req.body.redirect_uri,
        client_secret: config.wordpressClientSecret,
        code: req.body.code,
        grant_type: 'authorization_code'
    };

    request.post(tokenUrl, {json: true, form: params}, function (err, response, body) {

        request.get(userUrl, {
            json: true,
            headers: {Authorization: 'Bearer ' + body.access_token}
        }, function (err, response, profile) {
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({wordpress: profile.ID}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a Wordpress account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.wordpress = profile.ID;
                        user.picture = user.picture || profile.avatar_URL;
                        user.displayName = user.displayName || profile.display_name;

                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({wordpress: profile.ID}, function (err, existingUser) {
                    if (existingUser) {
                        return res.send({access_token: createJWT(existingUser)});
                    }
                    var user = new User({
                        wordpress: profile.ID,
                        picture: profile.avatar_URL,
                        displayName: profile.display_name
                    });

                    user.save(function (err) {
                        console.log(err);
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Sign in with Yahoo
 |--------------------------------------------------------------------------
 */
app.post('/auth/yahoo', function (req, res) {
    var accessTokenUrl = 'https://api.login.yahoo.com/oauth2/get_token';
    var clientId = req.body.client_id;
    var clientSecret = config.yahooClientSecret;
    var formData = {
        code: req.body.code,
        redirect_uri: req.body.redirect_uri,
        grant_type: 'authorization_code'
    };
    var headers = {Authorization: 'Basic ' + new Buffer(clientId + ':' + clientSecret).toString('base64')};

    // Step 1. Exchange authorization code for access token.
    request.post({url: accessTokenUrl, form: formData, headers: headers, json: true}, function (err, response, body) {
        var socialApiUrl = 'https://social.yahooapis.com/v1/user/' + body.xoauth_yahoo_guid + '/profile?format=json';
        var headers = {Authorization: 'Bearer ' + body.access_token};

        // Step 2. Retrieve profile information about the current user.
        request.get({url: socialApiUrl, headers: headers, json: true}, function (err, response, body) {

            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({yahoo: body.profile.guid}, function (err, existingUser) {
                    if (existingUser) {
                        return res.status(409).send({message: 'There is already a Yahoo account that belongs to you'});
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.tokenSecret);
                    User.findById(payload.sub, function (err, user) {
                        if (!user) {
                            return res.status(400).send({message: 'User not found'});
                        }
                        user.yahoo = body.profile.guid;
                        user.displayName = user.displayName || body.profile.nickname;
                        user.save(function () {
                            var token = createJWT(user);
                            res.send({access_token: token});
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({yahoo: body.profile.guid}, function (err, existingUser) {
                    if (existingUser) {
                        return res.send({access_token: createJWT(existingUser)});
                    }
                    var user = new User({
                        yahoo: body.profile.guid,
                        displayName: body.profile.nickname
                    });

                    user.save(function () {
                        var token = createJWT(user);
                        res.send({access_token: token});
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Unlink Provider
 |--------------------------------------------------------------------------
 */
app.post('/auth/unlink', ensureAuthenticated, function (req, res) {
    var provider = req.body.provider;

    if (providers.indexOf(provider) === -1) {
        return res.status(400).send({message: 'Unknown OAuth Provider'});
    }

    User.findById(req.user, function (err, user) {
        if (!user) {
            return res.status(400).send({message: 'User Not Found'});
        }
        user[provider] = undefined;
        user.save(function () {
            res.status(200).end();
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Start the Server
 |--------------------------------------------------------------------------
 */
app.listen(app.get('port'), app.get('host'), function () {
    console.log(('Express server listening on ' + app.get('host') + ':' + app.get('port')).yellow);
});
