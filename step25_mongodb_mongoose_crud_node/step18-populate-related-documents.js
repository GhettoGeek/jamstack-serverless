var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();

(async ()=>{
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology:true,useFindAndModify: false });
    const db = mongoose.connection;
    db.on('error', function (error){
        console.log( 'mongoose connection error: ',error);
    });
    db.once('open', function () {
      console.log('mongoose open for business');
    });

    //Define a schema
    const studentSchema = new mongoose.Schema({
      name: String,
      age: Number,
      course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
    });
    const courseSchema = new mongoose.Schema({
      courseName: String,
      noOfTopics: Number
    });

    //Creating a model
    const Student = mongoose.model('Student', studentSchema);
    const Course = mongoose.model('Course', courseSchema);

    try {
      
      // This find will return student object will only id of course, if we want to 
      // load related documents then we need to call populate
      //const student = await Student.find({_id: "5f8087bcc936e131c8173ef3" });
      const student = await Student.find({_id: "5f8087bcc936e131c8173ef3" }).populate("course");

      console.log("Result: ",student);

      
    }
    catch(error) {
      console.log(error);
    }
})();