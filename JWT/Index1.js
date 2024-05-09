const jwt = require("jsonwebtoken");
const zod = require("zod");
//assign a global password
const jwtPassword = "secret"

const emailSchema = zod.string().email();
const passworSchema  =zod.string().min(6);


function signJwt(username,password){
    const usernameResponse = emailSchema.safeParse(username);
    const passwordRespnose = passworSchema.safeParse(password);
    if(!usernameResponse.success || !passwordRespnose.success){
        return null;
    }
    const signature = jwt.sign({
        username
    },jwtPassword)
    return signature;
}

function decodeJwt(token){
    const decoded = jwt.decode(token);
    if(decoded){
        return true;
    }
    else{
        return false;
    }
}

function verifyJwt(token){
    try{
        const decoded = jwt.verify(token,jwtPassword);
        return decoded;
    }
    catch(err){
        return null;
    }
}

// const ans = signJwt("khutwadu@gmail.com","123456789");
// console.log(ans)

// const ans1 = decodeJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtodXR3YWR1QGdtYWlsLmNvbSIsImlhdCI6MTcxNTIxNzgwMX0.zVXCZElApV2WY8n4nfnl560ruSaQz7NWKAd16QNF2MI");
// console.log(ans1);

const ans2 = verifyJwt("eyJhbGciOifghbhbJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtodXR3YWR1QGdtYWlsLmNvbSIsImlhdCI6MTcxNTIxNzgwMX0.zVXCZElApV2WY8n4nfnl560ruSaQz7NWKAd16QNF2MI");
console.log(ans2)