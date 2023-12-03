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

// 查询所有借阅记录
router.get('/borrowRecord', (req, res) => {
  let sql = `SELECT * FROM borrowrecords ORDER BY BorrowDate DESC`
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results)
  })
})
// 查询某个借阅记录
router.get('/borrowRecord/:id', (req, res) => {
  const borrowRecordId = req.params.id
  let sql = `SELECT * FROM borrowrecords WHERE RecordID = ?`
  connection.query(sql, [borrowRecordId], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results)
  })
})
// 获得记录总数
router.get('/recordCounts', (req, res) => {
  let callStatement = `CALL GetRecordsCount()`
  connection.query(callStatement, (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.json(results[0])
  })
})
// 添加借阅记录
router.post('/borrowRecord', jsonParser, (req, res) => {
  let sql = `INSERT INTO borrowrecords SET ?`
  connection.query(sql, req.body, (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.send(results)
  })
})
// 修改借阅记录
router.put('/borrowRecord/:id', jsonParser, (req, res) => {
  const borrowRecordId = req.params.id
  let sql = `UPDATE borrowrecords SET ? WHERE RecordID = ?`
  connection.query(sql, [req.body, borrowRecordId], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.send(results)
  })
})
// 删除借阅记录
router.delete('/borrowRecord/:id', (req, res) => {
  const borrowRecordId = req.params.id
  let sql = `DELETE FROM borrowrecords WHERE RecordID = ?`
  connection.query(sql, [borrowRecordId], (err, results) => {
    if (err) {
      console.log(err)
      return
    }
    res.status(200)
    res.send(results)
  })
})

module.exports = router