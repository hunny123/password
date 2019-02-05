
function password(k,arr) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < k; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    if (text in arr){
        password(k,arr);
    }
        return text;
  }
  

  

var express = require('express');
var app = express();
var fs = require("fs");
var pass="";
var length=0;
var copy ="hide";
var status="Generate";
app.get('/',function(req,res){
    length=0; 
    copy ="hide";
    status="Generate";
    res.render('index.ejs',{name:pass,length:length,copy:copy,status:status});
});
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());

app.post("/password", function (req, res) {
     length = req.body.user.name
     le1 = "l"+length;
     copy = "show";
    fs.readFile( __dirname + "/" + "password.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        var pass = password(req.body.user.name,data.password[le1]);
        
        data.password[le1].push(pass);
        fs.writeFile( __dirname + "/" + "password.json", JSON.stringify(data), function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 
        status = "Generate More";
        res.render('index.ejs',{name:pass,length:length,copy:copy,status:status});
     });

}); 



app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});

