const mongoose = require('mongoose');

const uri = 'mongodb+srv://MichalH:michal110306@cluster0.xv978a0.mongodb.net/bam-db';

mongoose.connect(uri);

console.log('Connected to database!');
