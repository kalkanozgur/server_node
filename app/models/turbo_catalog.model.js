module.exports = mongoose => {
    const reqString = {
        type: String,
        required: true,
    }
    const commentSchema = mongoose.Schema(
        {
            user_id: reqString,
            text: reqString,
        },
        { timestamps: true }
    );
    const partsSchema = mongoose.Schema(
        {
            part_name: reqString,
            comments: [commentSchema]
        }
    );
    const partSchema = mongoose.Schema(
        {
            part_name: reqString,
            parts:[partsSchema],
            comments: [commentSchema]
        }
    );
    var turbocatalogSchema = mongoose.Schema(
        {
            turbo_model: String,
            motor_model: String,
            parts: [partSchema],
            expertiz_process: [reqString],
            extended_process: [reqString],
            comments: [commentSchema],
        },
        { timestamps: true }
    );
    
    turbocatalogSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const Turbo_Catalog = mongoose.model("turbo_catalog", turbocatalogSchema);
    return Turbo_Catalog;
  };