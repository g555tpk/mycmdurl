const hostname = `192.168.43.78`
const port =8080;

const http = require("http");
const fs = require('fs')
const path = require("path");
const express = require("/home/ganesh/mynodejsfolder/node_modules/express")
const bodyParser = require('/home/ganesh/mynodejsfolder/node_modules/body-parser');
const app = express()
var filecontent2="  Heellloooo Worldd...."
const server = http.createServer(app)
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname));


const { exec } = require("child_process");
const myfirstcmd ="ls -l"

function myexecfun(mycmd){
exec(mycmd, (error, stdout, stderr) => {
    if (error) {
        filecontent2=`error: ${error.message}`
       // console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        filecontent2=`stderr: ${stderr}`
      //  console.log(`stderr: ${stderr}`);
        return;
    }
    filecontent2=`stdout: ${stdout}`
    //console.log(`stdout: ${stdout}`);
    //console.log(filecontent2)
});
}

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'./home.html'));
   // console.log(req)
//console.log(res)
})

app.post('/execute', async (req, res) => {
    console.log("request received from web page "+ req.body.mecmd);
    try{
        myexecfun(req.body.mecmd)
    

res.send(`<html>
<head>
    <title>
        Linux Command
    </title>
    <script>
        function myFunction() {
        
          document.getElementById("prevCmd").innerHTML = ">>"+document.getElementById("mecmd").value;
          document.getElementById("demo").value = "Hello World...";
          document.getElementById("mecmd").value ='';
        }
        function myFunction2() {
          document.getElementById("demo").value = "";
          document.getElementById("prevCmd").innerHTML = ">>";
          document.getElementById("mecmd").value ="";


        }
        </script>
</head>
<body>
<h4>Enter your Linux command</h4>
<form action="/execute" method="POST">
<input id="mecmd"></input>
<br>
<button type ="submit" onclick="myFunction()">Execute</button>

<br>
<p id="prevCmd">>></p>
<br>
<button type ="reset" onclick="myFunction2()">Clear</button>
<br>
<textarea id="demo" rows="30" cols="100">`+
filecontent2+
`</textarea></form>
</body>
</html>`)

console.log("response sent")
    }catch{
        res.send("Internal server error");
    }
}
)

server.listen(port, hostname)

	console.log(`Server listening in the ${hostname} ip and ${port} port. Server home directory is ${__dirname}`)

    console.log(filecontent2)