const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

var con = null;
try {
    con = mysql.createPool({
        host:"localhost",
        port: 3306,
        database: "task_db",
        user: "root",
        password: "5252864Mi",
    }).promise()
}
catch (err) {
    console.log(err);
    console.log("error occured at auth db connection");
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ahamedismailhisamm@gmail.com", // your email
        pass: "ltqc hkaz dsig yzdi", // your password
    },
})

const adminCred = {
    username: "admin",
    password: "admin@123"
};

const hash =async (password)=>{
    const hashedpassword = await bcrypt.hash(password, 10);
    return hashedpassword;
}


const adminlogin = async(req, res) => {
    try {
        const { username, password } = req.body;
        if (username === adminCred.username && password=== adminCred.password) {
            res.json({ msg: "logged in as admin", res: "ok" });
            return;
        }
        else {
            res.json({ msg: "Invalid credentials", res: "no" });
            return;
        }
    }
    catch (err) {
        console.log(err);
        console.log("error occured at adminlogin");
        res.json({ msg: "error occured at adminlogin", res: "no" });
    }
}


const userlogin =async (req, res) => {
    try {
        const { userid, password } = req.body;
        
        const [data] = await con.query(`select userid, password from usercred where userid=? `, [userid]);
        console.log(data);
        
        if (data.length === 0) {
            res.json({ msg: "User not found", res: "no" });
            return;
        }
        const matched = await bcrypt.compare(password, data[0].password);
    
        if (matched) {
            res.json({ msg: "logged in successfully", res: "ok" });
            return;
        }
        else {
            res.json({ msg: "Invalid credentials", res: "no" });
            return;
        }
    }
    catch (err) {
        console.log(err);
        console.log("error occured at userlogin");
        res.json({ msg: "error occured at userlogin", res: "no" });
    }
}

const adduser = async(req, res) => {
    try {

        const { userid, password, name, email, dept, batch } = req.body;

        const hashedpassword = await hash(password);
        
        const [data] = await con.query(`select * from usercred where userid=?`, [userid]);
        if (data.length !== 0) {
            res.json({ msg: "user already exists", res: "no" });
            return;
        }

        await con.query(`insert into usercred values(?,?,?,?,?,?)`, [userid, hashedpassword, name, email, dept, batch]);

        const mailOptions = {
            from: "ahamedismailhisamm@gmail.com",
            to: email, // admin's email
            subject: "New User added",
            text: ` <html>Welcome to task app, You have added as a user.<br />Here are your credentials<br />
            Username : ${userid}<br />Password : ${password}</html>`,
        };
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });


        res.json({ msg: "User added successfully", res: "ok" });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at adduser");
        res.json({ msg: "error occured at adduser", res: "no" });
    }
}

module.exports = { adminlogin, userlogin, adduser };