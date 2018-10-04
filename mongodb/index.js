const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground', {useNewUrlParser: true}).then(() => {
    console.log('connected to mongodb');
}).catch(err => {
    console.log('Could not connect to mongo db', err);
});


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const courseObj = new Course({
        name: 'Angular js Course',
        author: 'Selvesan',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    const result = await courseObj.save();
    console.log(result);
}

// createCourse();

async function getCourse() {
    const courses = await Course.find({
        author: 'Selvesan',
        isPublished: true
    }).limit(10).sort({name: 1}).select({name: 1, tags: 1}); // sort by name in asc -1 for desc
    console.log(courses);
}


getCourse();

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.set({
        isPublished: true,
        author: 'James bond'
    });
}


async function removeCourse(id) {
    const course = await Course.deleteOne({_id: id});
    console.log(course);
}