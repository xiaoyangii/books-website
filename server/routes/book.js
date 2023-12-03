// 导入 express
const express = require('express')

// 导入数据库连接对象
const connection = require('../db/db.js')

// 导入 body-parser
const bodyParser = require('body-parser')
//解析 JSON 格式的请求体的中间件
const jsonParser = bodyParser.json()
//解析 querystring 格式请求体的中间件
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// 创建路由对象
const router = express.Router()

// 查询所有书籍
router.get('/book', (req, res) => {
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
router.get('/book/:id', (req, res) => {
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
// 查询最热门书籍
router.get('/hotbook', (req, res) => {
  let sql = `SELECT * FROM books ORDER BY BorrowedCounts DESC LIMIT 10`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results)
  })
})
// 查询书籍总数
router.get('/bookCounts', (req, res) => {
  let callStatement = `CALL GetBookCount()`
  connection.query(callStatement, (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results[0])
  })
})
// 查询书籍信息通过作者 或者 书名
router.post('/bookauthor', jsonParser, (req, res) => {
  const authorName = req.body.AuthorName
  let callStatement = `CALL GetBooksByAuthor(?)`
  let callStatement2 = `CALL GetBookInfo(?)`
  connection.query(callStatement , [authorName], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    if (results[0].length === 0) {
      connection.query(callStatement2 , [authorName], (err, results) => {
        if (err) {
          console.log(err)
          return
        }
        res.json(results)
      })
    }
  })
})
// 添加书籍
router.post('/book', jsonParser, (req, res) => {
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
router.put('/book/:id', jsonParser, (req, res) => {
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
router.delete('/book/:id', (req, res) => {
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

module.exports = router