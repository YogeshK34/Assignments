const express = require("express");

const users = [{
    name: "Walter",
    kidneys: [{
        healthy: false
    }]
}];

const app = express();

app.use(express.json());

app.get('/', function (req, res) {
    const waltKidneys = users[0].kidneys;
    const numberOfKidneys = waltKidneys.length;
    let numOfHealthyKidneys = 0;
    for (let i = 0; i < waltKidneys.length; i++) {
        if (waltKidneys[i].healthy) {
            numOfHealthyKidneys = numOfHealthyKidneys + 1;
        }
    }
    const numOfUnhealthyKidneys = numberOfKidneys - numOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numOfHealthyKidneys,
        numOfUnhealthyKidneys
    });
});

// Handle POST request to the /post URL
app.post('/', function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    })
    res.json({
        msg : "Added a Healthy Kidney!"
    })
});

app.put("/put",function(req,res){
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
