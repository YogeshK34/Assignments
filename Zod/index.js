// give me a simple zod function for better understanding
const zod = require("zod");

function userValidation(obj) {
    const createUserSchema = zod.object({
        name: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(6),
    });

    const response = createUserSchema.safeParse(obj);
    console.log(response);
}
userValidation({
    name: "John",
    email: "john.c.calhoun@examplepetstore.com",
    password: "349284848"
});

