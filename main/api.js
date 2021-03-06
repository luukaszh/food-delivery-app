const client = require('./connection.js');
const express = require('express');
const app = express();
const cors = require(`cors`);
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3300, ()=>{
  console.log("Sever is now listening at port 3300");
})

client.connect();

let token;

app.get('/food', (req, res)=>{
  client.query(`Select * from food`, (err, result)=>{
    if(!err){
      res.send(result.rows
      );
    } else{
      console.log(err, 'error')
    }
  });
  client.end;
})

app.get('/food/:id', (req, res)=>{
  client.query(`Select * from food where id=${req.params.id}`, (err, result)=>{
    if(!err){
      res.send(result.rows[0]);
    }
  });
  client.end;
})

app.delete('/food/:id', (req, res)=> {
  jwt.verify(token.token, 'secretKey', (err, authData) => {
    if (err && token.isadmin === false){
      res.status(403).send("You do not have permission!")
    } else{
      let insertQuery = `delete from food where id=${req.params.id}`
      // console.log(req.params.id)
      client.query(insertQuery, (err, result)=>{
        if(!err){
          res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
      })
      client.end;
    }
  });
})

app.get('/users', (req, res)=>{
  client.query(`Select * from users`, (err, result)=>{
    if(!err){
      res.send(result.rows
      );
    } else{
      console.log(err, 'error')
    }
  });
  client.end;
})

app.post('/users/login', (req, res)=> {
  client.query(`Select * from users`, (err, result) => {
    if (!err) {
      const users = result.rows;

      const {email, password} = req.body;
      const user = users.find(user => user.email === email && user.password === password)

      if (user) {
        console.log('git', user)
        token = generateToken(user)
        res.send(token);
      } else {
        res.status(400).send("Password or email incorrect")
      }
    } else {
      res.send(err, 'Users not found')
    }
  })
})

app.post('/users/register',  (req, res)=> {
  client.query(`Select * from users`, (err, result)=>{
    if(!err){
      const users = result.rows;
      // console.log(users)
      const {email} = req.body;
      const user = users.find(user => user.email === email)

      if(!user){
        const user = req.body;
        // console.log(user)
        let insertQuery = `insert into users(name, email, password, isadmin)
                       values('${user.name}', '${user.email}', '${user.password}', '${user.isadmin=false}')`

        client.query(insertQuery, (err, result)=>{
          if(!err){
            res.send('Insertion was successful')
          }
          else{
            res.send('err', err.message)
          }
        })
        client.end;
      }
      else {
        res.send('User already exists');
      }
    } else{
      res.send(err, 'Users not found')
    }
  })
})

app.post('/orders', (req, res) => {
  client.query(`Select * from orders`, (err, result)=>{

    const orders_len = result.rows.length;
    const formatItems = `${JSON.stringify(req.body.items)}`;
    const order = req.body;

    let insertQuery = `insert into orders(id, items, totalprice, name, address)
                         values('${order.id = orders_len + 1}', '${formatItems}', '${order.totalprice}', '${order.name}', '${order.address}')`

    client.query(insertQuery, (err, result)=>{
      if(!err){
        res.send('Insertion was successful')
      }
      else{
        res.send('err', err.message)
      }
    })
    client.end;
  });
});





app.get('/examplefood', (req, res)=>{
  jwt.verify(token.token, 'secretKey', (err, authData) => {
    if (err && token.isadmin === false){
      res.sendStatus(403);
    } else{
      client.query(`Select * from examplefood`, (err, result)=>{
        if(!err){
          res.send(result.rows);
        } else{
          res.send(err, 'error')
        }
      });
      client.end;
    }
  });
})

app.post('/examplefood/add', (req, res)=>{
  jwt.verify(token.token, 'secretKey', (err, authData) => {
    if (err && token.isadmin === false){
      res.status(403).send("You do not have permission!")
    } else{
      client.query(`Select * from examplefood`, (err, result)=>{
        if(!err){
          arr_len = result.rows.length;
          let j = 1;
          sorted_rows = result.rows.sort(dynamicSort('id'))

          for (i in sorted_rows) {
            if (parseInt(sorted_rows[i].id) !== j) {
              const food = req.body;

              let insertQuery = `insert into examplefood(id, name, price, cooktime, imageurl)
                       values('${food.id = j}', '${food.name}', '${food.price}', '${food.cooktime}', '${food.imageurl}')`

              client.query(insertQuery, (err, result) => {
                if (!err) {
                  res.send('Insertion was successful')
                  client.end;
                } else {
                  res.send('Insertion was NOT successful', err.message)
                }
              })
              client.end;
            } else {

              if (j === sorted_rows.length){
                const food = req.body;

                let insertQuery = `insert into examplefood(id, name, price, cooktime, imageurl)
                       values('${food.id = j + 1}', '${food.name}', '${food.price}', '${food.cooktime}', '${food.imageurl}')`

                client.query(insertQuery, (err, result) => {
                  if (!err) {
                    res.send('Insertion was successful')
                    client.end;
                  } else {
                    res.send('Insertion was NOT successful', err.message)
                  }
                })
                client.end;
              } else {
                j += 1;
              }
            }
          }
        } else{
          res.send(err, 'error')
        }
      });
    }
  });
})






const generateToken = (user) => {
  const token = jwt.sign({
    email: user.email, isadmin: user.isadmin
  }, "secretKey", {
    expiresIn: "30d"
  });
  user.token = token;
  console.log(token)
  return user;
}

function dynamicSort(property) {
  return function(a, b) {
    return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
  }
}
