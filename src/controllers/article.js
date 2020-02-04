import Article from '../models/article'

export default {

  /*获取所有文章*/
  async getAllArticles(ctx, next){
    let articles = await Article.find()
    ctx.body = {
      code: 0,
      msg: '获取成功',
      articles
    }
  },

  /*根据标题查询一篇文章*/
  async getArticleByTitle(ctx, next){
    let {title} = ctx.query
    let article = await Article.findOne({
      title
    })
    if(article){
      ctx.body = {
        code: 0,
        msg: '查询成功',
        article
      }
    }else{
      ctx.body = {
        code: -1,
        msg: '查询失败，不存在该文章'
      }
    }
  },

  /*根据类型获取所有文章*/
  async getArticlesByType(ctx, next){
    let {type} = ctx.query
    let articles = await Article.find({
      type
    })
    if(articles.length){
      ctx.body = {
        code: 0,
        msg: '获取成功',
        articles
      }
    }else{
      ctx.body = {
        code: -1,
        msg: '获取失败，不存在该类型的文章'
      }
    }
  },

  /*所有type为"技术分享"和"韶华追忆"文章*/
  async getArticlesTypeInTS(ctx, next){
    let articles = await Article.find({
      $or:[
        {type: "技术分享"},
        {type: "韶华追忆"}
      ]
    })
    if(articles.length){
      ctx.body = {
        code: 0,
        msg: '获取成功',
        articles
      }
    }else{
      ctx.body = {
        code: -1,
        msg: '获取失败，不存在该类型的文章'
      }
    }
  },

  /*发表文章*/
  async addArticle(ctx, next){
    let {
      title,
      type,
      body,
      create_time,
      update_time,
      views
    } = ctx.request.body

    let article = await Article.findOne({
      title
    })
    if(article){
      ctx.body = {
        code: -1,
        msg: `已存在title为“${title}”的文章`
      }
      return
    }
    /*将文章存入数据库*/
    let newArticle = await Article.create({
      title,
      type,
      body,
      create_time,
      update_time,
      views
    })
    if(newArticle){
        ctx.body = {
          code: 0,
          msg: '发表成功',
          article: newArticle
        }
    }else{
      ctx.body = {
        code: -1,
        msg: '发表失败'
      }
    }
  },

  /*更新文章*/
  async updateArticle(ctx, next){
    let {
      title,
      type,
      body,
      images,
      update_time
    } = ctx.request.body
    let article = await Article.findOne({
      title
    })
    await Article.updateOne({title}, {
      type,
      body,
      images,
      update_time
    }, (err, res) => {
      if(err){
        ctx.body = {
          code: -1,
          msg: '更新失败'
        }
        return
      }
    })
    let newArticle = await Article.findOne({title})
    ctx.body = {
      code: 0,
      msg: '更新成功',
      article: newArticle
    }
  },

  /*删除文章*/
  async deleteArticle(ctx, next){
    await Article.remove({title}, err => {
      if(err){
        ctx.body = {
          code: -1,
          msg: '删除失败'
        }
      }else{
        ctx.body = {
          code: 0,
          msg: '删除成功'
        }
      }
    })
  },

  /*查看该文章*/
  async view(ctx, next){
    let title = ctx.request.body.title
    let article = await Article.findOne({title})
    article.views ++
    await Article.updateOne({title}, {
      views: article.views
    }, err => {
      if(err){
        ctx.body = {
          code: -1,
          msg: '查看失败'
        }
      }else{
        ctx.body = {
          code: 0,
          msg: '查看成功'
        }
      }
    })
  },

  /*点赞该文章*/
  async like(ctx, next){
    let {
      title,
      username,
      nickname,
      time
    } = ctx.request.body
    await Article.updateOne({title}, {
      $addToSet: {
        likes: {
          username,
          nickname,
          time
        }
      }
    }, 
    err => {
      if(err){
        ctx.body = {
          code: -1,
          msg: '点赞失败'
        }
      }else{
        ctx.body = {
          code: 0,
          msg: '点赞成功'
        }
      }
    })
  },

  /*评论该文章*/
  async comment(ctx, next){
    let {
      title,
      username,
      nickname,
      comment,
      time
    } = ctx.request.body
    await Article.updateOne({title}, {
      $addToSet: {
        comments: {
          username,
          nickname,
          comment,
          time
        }
      }
    },
    err => {
      if(err){
        ctx.body = {
          code: -1,
          msg: '评论失败'
        }
      }else{
        ctx.body = {
          code: 0,
          msg: '评论成功'
        }
      }
    })
  }
}