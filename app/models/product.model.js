module.exports = mongoose => {
    const reqString = {
        type: String,
        required: true,
    }
    const commentSchema = mongoose.Schema(
        {
            user_id: reqString,
            text: reqString
        },
        { timestamps: true }
    );
    const processSchema = mongoose.Schema(
        {
            process_name: reqString,
            status: reqString
        }
    );
    var productSchema = mongoose.Schema(
        {
            turbo_id: {
                type: String
            },
            model: {
                type: String
            },
            engine: {
                type: String
            },
            customer_id: {
                type: String
            },
            expertiz_process: [
                processSchema
            ],
            changed_parts: [
                processSchema
            ],
            teklif: {
                type: String
            },
            temizlik_onay: {
                type:Boolean,
                default: false
            },
            temizlik_oncelik: String, // 1.st 2.nd 3.rd
            toplama_onay: {
                type:Boolean,
                default: false
            },
            toplama_oncelik: String, // 1.st 2.nd 3.rd
            extended_process:[
                String
            ],
            dead_line: Date,
            comment: [commentSchema],
            is_complated: {
                type:Boolean,
                default: false
            }
        },
        { timestamps: true }
    );
  
    productSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const Product_list = mongoose.model("product", productSchema);
    return Product_list;
  };