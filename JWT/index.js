const jwt = require("jsonwebtoken")

const value = {
    name:"Harry Potter",
    school_name:"Hogwarts"
}

// const token = jwt.sign(value,"secret");
// console.log(token)



const decode = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUm9uIiwic2Nob29sX25hbWUiOiJIb2d3YXJ0cyIsImlhdCI6MTcxNTIxNTg2MX0.V-WhdxxRsxKxJ5dyxzXWXLcoxFRJFvLjc4fw2gVGZX8","secret")
console.log(decode)