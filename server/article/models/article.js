const mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema({
  text: String,
  title: String,
  description: String,
  feature_img: String,
  claps: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String
    }
  ]
});

ArticleSchema.methods.clap = function() {
  this.claps++;
  return this.save();
}

ArticleSchema.methods.comment = function(comment) {
  this.comments.push(comment);
  return this.save();
}

ArticleSchema.methods.addAuthor = function(_id) {
  this.author = _id;
  return this.save();
}

ArticleSchema.methods.getUserArticle = function(_id) {
  Article.find({'author': _id}).then((article) => {
    return article;
  });
}

module.exports = mongoose.model('Article', ArticleSchema);