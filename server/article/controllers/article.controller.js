const cloudinary = require('cloudinary');
const fs = require('fs');

const Article = require('../models/article');
const User = require('../../user/models/user');

module.exports = {
  addArticle: (request, response, next) => {
    let {text, title, claps, description} = request.body;

    if (request.files.image) {
      cloudinary.uploader.upload(
        request.files.image.path, (result) => {
          let obj = {
            text,
            title,
            claps,
            description,
            feature_img: result.url !== null ? result.url : '' 
          }
          saveArticle(obj);
        },
        {
          resource_type: 'image',
          eager: [
            {effect: 'sepia'}
          ]
        }
      );
    } else {
      saveArticle({text, title, claps, description, feature_img: ''});
    }

    function saveArticle(obj) {
      new Article(obj).save((error, article) => {
        if (error) {
          response.send(error);
        } else if (!article) {
          response.send(400);
        } else {
          return article.addAuthor(request.body.author_id).then((_article) => {
            return response.send(_article);
          });
        }
        next();
      });
    }
  },

  getAll: (request, response, next) => {
    Article.find(request.params.id)
      .populate('author')
      .populate('comments.author').exec((error, article) => {
        if (error) {
          response.send(error);
        } else if (!article) {
          response.send(404);
        } else {
          response.send(article);
        }
        next();
      });
  },

  clapArticle: (request, response, next) => {
    Article.findById(request.body.article_id).then((article) => {
      return article.clap().then(() => {
        return response.json({message: 'Done'});
      });
    }).catch(next);
  },

  commentArticle: (request, response, next) => {
    Article.findById(request.body.article_id).then((article) => {
      return article.comment({
        author: request.body.author_id,
        text: requst.body.comment
      }).then(() => {
        return response.json({message: 'Done'});
      });
    }).catch(next);
  },

  getArticle: (request, response, next) => {
    Article.findById(request.params.id)
      .populate('author')
      .populate('comments.author').exec((error, article) => {
        if (error) {
          response.send(error);
        } else if (!article) {
          response.send(404);
        } else {
          response.send(article);
        }
        next();
      })
  }
}