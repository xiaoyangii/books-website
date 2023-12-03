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


// 查询所有作者
router.get('/author', (req, res) => {
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
router.get('/author/:id', (req, res) => {
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
// 查询作者总数
router.get('/authorCounts', (req, res) => {
  let callStatement = `CALL GetAuthorsCount()`
  connection.query(callStatement, (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results[0])
  })
})
// 查询作者信息通过姓名
router.post('/authorname', jsonParser, (req, res) => {
  const authorName = req.body.AuthorName
  let callStatement = `CALL GetAuthorInfo(?)`
  connection.query(callStatement , [authorName], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results)
  })
})
// 添加作者
router.post('/author', jsonParser, (req, res) => {
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
router.put('/author/:id', jsonParser, (req, res) => {
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
router.delete('/author/:id', (req, res) => {
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

module.exports = router