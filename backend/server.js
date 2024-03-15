const express = require('express');
const cors = require('cors');
const authRouter = require('./Routes/authRoute');
const dbRouter = require('./Routes/dbRoute');

const app = express();



app.use(cors());
app.use(express.json());


try {
    app.listen(8000, () => {
        console.log("listening at port 8000");
    })
}
catch (err) {
    console.log(err);
    console.log('error in listening');
}

app.get('/', (req, res) => {
    res.send("Welcome to student task management backend");
})

app.use('/auth', authRouter);

app.use('/db', dbRouter);
