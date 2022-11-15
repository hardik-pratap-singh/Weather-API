const express = require("express") ; 
const app = express();
const path = require("path");
const bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({extended : true})); 

const https = require("https");

app.get("/" , function (req, res) {
    // res.send("Welcome to the main page! ");
    res.sendFile(path.join(__dirname , "main.html")); 
})

//all these callback functions can also be written without arrow notation : just in simple notation 
app.post("/" , function(req, res){
    // res.send("I got your post request !! ") ;
    // res.write("The weather of this city ")
    const city = req.body.city ; 
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f90bdfb364ba12038a187794a3874b35&units=metric";
    https.get(url , (response) => {
        response.on("data" , (data) => {
            // console.log(d); 
            const weatherinfo = JSON.parse(data);
            // console.log(weatherinfo);
            const temp = weatherinfo.main.temp;
            // console.log(temp); 
            const icon = weatherinfo.weather[0].icon  ; 
            // console.log(icon);
            // weather[0].icon
            res.write("<h1>Weather Information In " + city + " is as Follows :- </h1>") ; 
            res.write("<h3>Weather Description: " + weatherinfo.weather[0].description + "</h3>") ; 
            res.write("<h3>The Temperature is : " + temp + " Degree Celcius</h3>") ; 
            // res.write("<img src = " + 
            const imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png" ; 
            res.write("<img src =" + imgurl + ">");
            res.send() ;   
        })
    })
    // console.log(req.body.city) ; 
})

app.listen(3000 , function () {
    console.log("Server @ 3000"); 
})