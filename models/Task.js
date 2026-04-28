import mangoose from "mangoose";

const taskSchema = new mangoose.Schema({
    title : {type: String, required: true},
    completed : {type: Boolean, default: false},
    userId : {type: mangoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: true});

export default mangoose.model('Task', taskSchema);