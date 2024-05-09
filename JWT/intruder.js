const jwt = require("jsonwebtoken")

const credentials = {
    name:"Ron",
    school_name:"Hogwarts"
}

const new_token = jwt.sign(credentials,"secreteer");
console.log(new_token)
