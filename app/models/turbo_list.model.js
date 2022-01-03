module.exports = mongoose => {
    const reqString = {
        type: String,
        required: true,
    }
    const descriptionsSchema = mongoose.Schema(
        {
            user_id: reqString,
            text: reqString
        },
        { timestamps: true }
    );
    var turboschema = mongoose.Schema(
        {
            turbo_model: String
            ,
            customer_id: reqString
            ,
            description: [descriptionsSchema],
        },
        { timestamps: true }
    );
  
    turboschema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const Turbo_List = mongoose.model("turbo_list", turboschema);
    return Turbo_List;
  };