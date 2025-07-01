const mongoose = require('mongoose');

const url = process.env.MONGOOSE_URL;

mongoose.connect(url);

console.log('Connected to database!');

export default mongoose;
