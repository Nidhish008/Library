const {Schema,model}= require("mongoose");

const userSchema = new Schema({
    name: {type:String,required:true},
    email: { type: String, unique: true,required: true },
    password: String,
    role: { type: String, enum: ["admin","user"], default: "user" }
});

module.exports=model("User", userSchema);
