const mysql = require('mysql')
const {DBHOST, DBPORT, DBNAME, DBPASSWORD, DBUSER} = require('../config/config')

const connection = mysql.createConnection({
  user: DBUSER,          //用户名
  password: DBPASSWORD,	 //密码
  host: DBHOST,		       //主机（默认都是local host）
  database: DBNAME,      //数据库名
  port: DBPORT           //端口（默认都是3306）
})
// 测试连接
connection.connect(err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('连接成功!!!')
})

module.exports = connection
