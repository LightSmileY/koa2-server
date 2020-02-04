import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  id: {
    type: String,
    unique: true,
    reqire: true
  },
  title: {
    type: String,
    require: true
  },
  type: {
    type: String,
    reqire: true
  },
  body: [
    {
      para: String,
      image: String
    }
  ],
  create_time: {
    type: String,
    reqire: true
  },
  update_time: {
    type: String
  },
  views: {
    type: Number
  },
  likes: [
    {
      username: {
        type:String,
        unique: true
      },
      nickname: {
        type:String
      },
      time: {
        type: Date
      }
    }
  ],
  comments: [
    {
      username: {
        type:String
      },
      nickname: {
        type:String
      },
      comment: {
        type:String
      },
      time: {
        type: String
      }
    }
  ]
})

export default mongoose.model('article', ArticleSchema)