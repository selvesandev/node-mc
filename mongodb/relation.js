const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground').then(function () {
    console.log('connected to mongodb');
}).catch(err => {
    console.log('error');
});


const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
}));


async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });
    const result = await course.save();
    console.log(result);
}


async function listCourse() {
    const courses = await Course.find().populate('author').select('name');
    console.log(courses);
}


// createAuthor('selvesan', 'selves', 'selvesan.com');
// createCourse('Node course', '5bb716f195ca94848bffeb59');
listCourse();