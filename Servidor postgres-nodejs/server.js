var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
 
app.use(cors(corsOptions))
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});
 
require('./app/route/customer.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port);
})
 
function initial(){
 
  let customers = [
    {
      cpf:"235.643.932-10",
      name: "Joe Thomas"
    },
    {
      cpf:"235.643.932-11",
      name: "Peter Smith"
    },
    {   
      cpf:"235.643.932-12",
      name: "Lauren Taylor"
    },
    {
      cpf:"235.643.932-13",
      name: "Mary Taylor"
    },
    {
      cpf:"235.643.932-14",
      name: "David Moore"
    },
    {
      cpf:"235.643.932-15",
      name: "Holly Davies"
    },
    {
      cpf:"235.643.932-16",
      name: "Michael Brown"
    }
  ]
 
  // Init data -> save to MySQL
  const Customer = db.customers;
  for (let i = 0; i < customers.length; i++) { 
    Customer.create(customers[i]);  
  }
}