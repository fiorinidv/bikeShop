var express = require('express');
var request = require('request');
var session = require("express-session");


var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(
 session({ 
  secret: 'a4f8071f-c873-4447-8ee2',
  resave: false,
  saveUninitialized: false,
 })
);





app.get('/', function (req, res) {
 
        res.render('index')  
 
});



app.get('/cart', function (req, res) {


 if(!req.session.cartList){

 req.session.cartList= [];
}

 if(req.query != undefined) {
                       var data={};
                                data.model  = req.query.model;
                                data.price  = req.query.price;

                               req.session.cartList.push(data);

                            var total =0;
                               for (var i= 0; i<req.session.cartList.length; i++) {
                                          total += parseFloat(req.session.cartList[i].price);                                       
                                       
                                           }
                }



      res.render('cart', {cart: req.session.cartList, final:total});
});
  


app.get('/delete', function (req, res) {
  var total =0;
  for (var i= 0; i<req.session.cartList.length; i++) {
          total += parseFloat(req.session.cartList[i].price);                                       
 }
        
  req.session.cartList.splice(req.query.indice, 1);
  
  res.render('cart', {cart: req.session.cartList, final:total});
});
  
  








app.listen(80, function () {
  console.log("Server listening on port 80");
});