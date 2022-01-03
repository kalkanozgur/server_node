module.exports = mongoose => {
    const reqString = {
        type: String,
        required: true,
    }
    const messageSchema = mongoose.Schema(
        {
            user_id: reqString,
            text: reqString
        },
        { timestamps: true }
    );
    var userschema = mongoose.Schema(
        {
            name: reqString,
            messages: [messageSchema]
        },
        { timestamps: true }
    );
  
    userschema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const Users = mongoose.model("users", userschema);
    return Users;
  };