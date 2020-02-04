import Router from 'koa-router'
import article from '../controllers/article'

let router = new Router({
  prefix: '/article'
})

/***********文章接口***********/

router.get('/getAll', article.getAllArticles)          // 获取所有文章
      .get('/getByTitle', article.getArticleByTitle)   // 根据标题查询一篇文章
      .get('/getByType', article.getArticlesByType)    // 根据类型获取所有文章
      .get('/getInTS', article.getArticlesTypeInTS)    // 查询类型为“技术分享”和“韶华追忆”的文章
      .post('/add', article.addArticle)                // 发表文章
      .post('/update', article.updateArticle)          // 更新文章
      .post('/delete', article.deleteArticle)          // 删除文章
      .post('/view', article.view)                     // 查看该文章
      .post('/like', article.like)                     // 点赞该文章
      .post('/comment', article.comment)               // 评论该文章

export default router