const express= require('express');
const mysql =require('mysql');

//Create connection
const db = mysql.createConnection({
	host: 'localhost',
  	user: 'root',
  	password: '',
	database:'nodemysql'
});

//Connect
db.connect((err)=>{
	if(err) throw err;
	console.log('connected...');
});

const app =express();

//create DB
app.get('/createdb',(req,res)=>{
	let sql ='CREATE DATABASE nodemysql';
	db.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send('Database created ...');
	});
});

//create table
app.get('/createpoststable',(req,res)=>{
	let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255),body VARCHAR(255), PRIMARY KEY (id))';
	db.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send('posts table created ...');
	});
});

//Insert post 1
app.get('/addpost1',(req,res)=>{
		let post = {title:'Post one',body:'This is post number one'};
		let sql= 'INSERT INTO posts SET ?';
		let query = db.query(sql,post,(err,result)=>{
			if(err) throw err;
			console.log(result);
			res.send('post one added ...');
		});
});

//Insert post 2
app.get('/addpost2',(req,res)=>{
		let post = {title:'Post two',body:'This is post number two'};
		let sql= 'INSERT INTO posts SET ?';
		let query = db.query(sql,post,(err,result)=>{
			if(err) throw err;
			console.log(result);
			res.send('post two added ...');
		});
});

//select posts
app.get('/getposts',(req,res)=>{
		let sql= 'SELECT * FROM posts';
		let query = db.query(sql,(err,results)=>{
			if(err) throw err;
			console.log(results);
			res.send('posts fetched ...');
		});
});

//select single post
app.get('/getpost/:id',(req,res)=>{
		let sql= `SELECT * FROM posts WHERE id = ${req.params.id}`;
		let query = db.query(sql,(err,result)=>{
			if(err) throw err;
			console.log(result);
			res.send('post fetched ...');
		});
});

//update single post
app.get('/updatepost/:id',(req,res)=>{
		let newTitle= 'updated title';
		let sql= `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
		let query = db.query(sql,(err,result)=>{
			if(err) throw err;
			console.log(result);
			res.send('post updated ...');
		});
});

//delete single post
app.get('/deletepost/:id',(req,res)=>{
		let sql= `DELETE FROM posts WHERE id = ${req.params.id}`;
		let query = db.query(sql,(err,result)=>{
			if(err) throw err;
			console.log(result);
			res.send('post deleted ...');
		});
});



app.listen('3000',()=>{
	console.log('Connected on port 3000');
});
