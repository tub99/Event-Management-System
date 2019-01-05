const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = require('./user').schema;
const OrgSchema = require('./organisation').schema;



const shareOrgSchema = new Schema({
    organisations: [{ type: String}],
    users: [{ type: String}],
    admins: [{ type: String}]
}),
    classesSchema = new Schema({
        className: { type: String},
        classColor: String

    }),
    projectAnnotationSchema = new Schema({
        typeOfAnnotation: { type: String, required: true, default: 'Shapes' },
        typeOfClasses: [classesSchema]
    });

const projectSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    type: { type: String, required: true, default:'CT' },
    uploadType: { type: Number, default: 1 },
    shared: shareOrgSchema,
    studyList: { type: Schema.Types.ObjectId, ref: 'studyList' },
    annotation: [projectAnnotationSchema]
}, { timestamps: true });

projectSchema.methods.response = function response() {
    const project = this;
    return {
        projectId: project._id,
        userId: project.userId,
        title: project.title,
        shared: project.shared,
        studyList: project.studyList,
        uploadType: project.uploadType,
        annotation: project.annotation
    };
}
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;