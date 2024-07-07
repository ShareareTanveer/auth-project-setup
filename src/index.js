import dotenv from "dotenv"
import DBConnection from "./db/index.js";
import app from "./app.js";

dotenv.config({
    path: './.env'
})

const port = process.env.PORT;

DBConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is Running at port ${port || 3000}`)
        })
        app.on("error", (err) => {
            console.error("Error", err)
            throw err;
        })
    })
    .catch((err) => {
        console.error("DB Connection Failed", err)
    })


// app.use(cors())

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });