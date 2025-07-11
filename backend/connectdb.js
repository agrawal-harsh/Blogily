const mongoose = require('mongoose');


const connect = async(uri)=>{
    try {        
        await mongoose.connect(uri)
        console.log('Mongo connected successfully');
    } catch (error) {
        console.log('Their is an error connecting Mongo',error);
    }
}
module.exports = connect;