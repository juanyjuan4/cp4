const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost:27017/cp4', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const profileSchema = new mongoose.Schema({
    name: String,
    username: String,
    img: String,
    bio: String
});

profileSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });

profileSchema.set('toJSON', {
    virtuals: true
});

const Profile = mongoose.model('Profile', profileSchema);

app.get('/api/profiles', async (req, res) => {
    try {
        let profiles = await Profile.find();
        res.send(profiles);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.post('/api/profiles', async (req, res) => {
    const profile = new Profile({
        name: req.body.name,
        username: req.body.username,
        img: req.body.img,
        bio: req.body.bio,
    });
    try {
        await profile.save();
        res.send(profile);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.delete('/api/profiles/:_id', async (req, res) => {
    try {
        await Profile.deleteOne({
            _id: req.params._id
        });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.put('/api/profiles/:_id', async (req, res) => {
    try {
        let profile = await Profile.findOne({
            _id: req.params._id,
        });
        profile.bio = req.body.bio;
        await profile.save();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));