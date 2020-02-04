import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import mongoose from 'mongoose'
import cors from 'koa-cors'
import article from './routes/article'

const app = new Koa()

// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(article.routes())
app.use(article.allowedMethods())

// 连接MongoDB数据库
/*mongoose.connect('mongodb://localhost:27017/myblog', {
  useNewUrlParser: true
})*/

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

console.log('Koa2服务正在3029端口运行...')

module.exports = app
