module.exports = mongoose => {
    const reqString = {
        type: String,
        required: true,
    }
    const billSchema = mongoose.Schema(
        {
            amount: reqString,
        },
        { timestamps: true }
    );
    billSchema.method("toJSON", function() {
        const { __v, _id, updatedAt, ...object } = this.toObject();
        //object.id = _id;
        return object;
    });
    const commentSchema = mongoose.Schema(
        {
            user_id: reqString,
            text: reqString
        },
        { timestamps: true }
    );
    var customerSchema = mongoose.Schema(
        {
            name: reqString,
            adress: {
                type: String,
            },
            vkn: {
                type: String,
            },
            maps_geo: {
                type: String,
            },
            phone: {
                type: String,
            },
            bill: [billSchema],
            comment: [commentSchema],
        },
        { timestamps: true }
    );
  
    customerSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
  
    const Customer_list = mongoose.model("customer_list", customerSchema);
    return Customer_list;
};