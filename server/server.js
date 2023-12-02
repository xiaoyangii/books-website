const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const {DBHOST, DBPORT, DBNAME, DBPASSWORD, DBUSER} = require('./config/config.js')
const app = express()
//解析 JSON 格式的请求体的中间件
const jsonParser = bodyParser.json()
//解析 querystring 格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const connection = mysql.createConnection({
  user: DBUSER,          //用户名
  password: DBPASSWORD,	 //密码
  host: DBHOST,		       //主机（默认都是local host）
  database: DBNAME,      //数据库名
  port: DBPORT           //端口（默认都是3306）
})
// 测试连接
connection.connect(err=>{
  console.log(err, '如果为null 就是连接成功')
})

app.use(cors()) //解决跨域问题

// 查询所有作者
app.get('/author', (req, res) => {
  let sql = `SELECT * FROM authors`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results)
  })
})
// 查询某个作者
app.get('/author/:id', (req, res) => {
  const authorId = req.params.id
  let sql = `SELECT * FROM authors WHERE AuthorID = ?`
  connection.query(sql, [authorId], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results)
  })
})
// 添加作者
app.post('/author', jsonParser, (req, res) => {
  let sql = `INSERT INTO authors SET ?`
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.send(results)
  })
})
// 修改作者
app.put('/author/:id', jsonParser, (req, res) => {
  const authorId = req.params.id
  let sql = `UPDATE authors SET ? WHERE AuthorID = ?`
  connection.query(sql, [req.body, authorId], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.send(results)
  })
})
// 删除作者
app.delete('/author/:id', (req, res) => {
  const authorId = req.params.id
  let sql = `DELETE FROM authors WHERE AuthorID = ?`
  connection.query(sql, [authorId], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.send(results)
  })
})

// 查询所有书籍
app.get('/book', (req, res) => {
  let sql = `SELECT * FROM books`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results)
  })
})
// 查询某本书籍
app.get('/book/:id', (req, res) => {
  const bookId = req.params.id
  let sql = `SELECT * FROM books WHERE BookID = ?`
  connection.query(sql, [bookId], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results)
  })
})
// 添加书籍
app.post('/book', jsonParser, (req, res) => {
  let sql = `INSERT INTO books SET ?`
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.send(results)
  })
})
// 修改书籍
app.put('/book/:id', jsonParser, (req, res) => {
  const bookId = req.params.id
  let sql = `UPDATE books SET ? WHERE BookID = ?`
  connection.query(sql, [req.body, bookId], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.send(results)
  })
})
// 删除书籍
app.delete('/book/:id', (req, res) => {
  const bookId = req.params.id
  let sql = `DELETE FROM books WHERE BookID = ?`
  connection.query(sql, [bookId], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.send(results)
  })
})

// 开启服务器
app.listen(3000,()=>{
  console.log('服务器在3000端口开启。。。。。')
})
