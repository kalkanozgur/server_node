module.exports = mongoose => {
    var imageSchema = mongoose.Schema(
        {
            path: String,
            url: String,
            caption: String,
            createdAt: Date
        }
    )
    const Image = mongoose.model("image", imageSchema);
    return Image;
};