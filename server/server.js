const express = require('express')
const cors = require('cors')
const authorRouter = require('./routes/author.js')
const bookRouter = require('./routes/book.js')
const borrowRecordRouter = require('./routes/borrowRecord.js')
const app = express()

app.use(cors()) //解决跨域问题
app.use(authorRouter)
app.use(bookRouter)
app.use(borrowRecordRouter)



// 开启服务器
app.listen(3000,()=>{
  console.log('服务器在3000端口开启......')
})
