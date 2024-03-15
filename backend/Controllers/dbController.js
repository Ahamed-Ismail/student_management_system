const mysql = require('mysql2');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ahamedismailhisamm@gmail.com", // your email
        pass: "ltqc hkaz dsig yzdi", // your password
    },
})


var con = null;
try {
    con = mysql.createPool({
        host: "studenttaskmanagement.cu4aa78nopao.us-east-1.rds.amazonaws.com",
        port: 3306,
        database: "task_db",
        user: "root",
        password: "5252864Mi",
    }).promise()
    console.log("DB connected");
}
catch (err) {
    console.log(err);
    console.log("error occured at auth db connection");
}

const gettask = async (req, res) => {
    try {
        const userid = req.params.userid;

        const [data] = await con.query(`select * from task where userid=?`, [userid]);
        

        res.json({ data: data, res: 'ok' });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at gettask");
        res.json({ msg: "error occured at gettask", res: "no" });
    }
}

const getprofile = async (req, res) => {
    try {
        const userid = req.params.userid;

        const [data] = await con.query(`select userid, name, email, dept, batch from usercred where userid=?`, [userid]);
        console.log(data);

        res.json({ data: data, res: 'ok' });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at gettask");
        res.json({ msg: "error occured at gettask", res: "no" });
    }
}

const finishtask = async (req, res) => {
    try {
        const { userid, taskdesc, deadline } = req.body;
        const status = 1;

        await con.query(' update task set status=? where userid=? and taskdesc=?', [status, userid, taskdesc]);

        res.json({ msg: "Task completed successfully", res: "ok" });
        
    }
    catch (err) {
        console.log(err);
        console.log("error occured at finishtask");
        res.json({ msg: "error occured at finishtask", res: "no" });
    }

}

const addtask = async (req, res) => {
    //SET GLOBAL event_scheduler = ON;
    //SELECT * FROM information_schema.events;


    try {
        const { adduserid, addtask, addDeadline } = req.body;

        await con.query('insert into task values(?,?,?,?) ', [adduserid, addtask, addDeadline, 0]);

        await con.query(`
        CREATE EVENT ${mysql.escapeId(adduserid + addtask)}
        ON SCHEDULE AT '${mysql.escape(addDeadline)} 23:59:59'
        DO
        BEGIN
            DECLARE statusval INT;
            SELECT status INTO statusval FROM task 
            WHERE userid = ${mysql.escape(adduserid)} 
            AND taskdesc = ${mysql.escape(addtask)} 
            AND deadline = ${mysql.escape(addDeadline)} 
            LIMIT 1;
            IF statusval = 0 THEN
                UPDATE task SET status = 2 
                WHERE userid = ${mysql.escape(adduserid)} 
                AND taskdesc = ${mysql.escape(addtask)} 
                AND deadline = ${mysql.escape(addDeadline)};
            END IF;
            DROP EVENT IF EXISTS ${mysql.escapeId(adduserid + addtask)};
        END`); //event 

        const [data] = con.query('select email from usercred where userid=?', [userid]);

        const email = data[0].email;

        const mailOptions = {
            from: "ahamedismailhisamm@gmail.com",
            to: email, // admin's email
            subject: "New task added",
            text: ` <html>Task : ${addtask}<br></br>Due Date : ${addDeadline}</html>`,
        };
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });

        res.json({ msg: "Task added successfully", res: "ok" });
        
    }
    catch (err) {
        console.log(err);
        console.log("error occured at addtask");
        res.json({ msg: "error occured at addtask", res: "no" });
    }

}

const getalltask = async (req, res) => {
    try {
        const [data] = await con.query(`select * from task`);
        res.json({ data: data, res: 'ok' });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at getalltask");
        res.json({ msg: "error occured at getalltask", res: "no" });
    }
}

const deletetask = async (req, res) => {
    try {
        const { userid, taskdesc, deadline, status } = req.body;
        con.query('delete from task where userid=? and taskdesc=? and status=?', [userid, taskdesc, status]);
        res.json({ msg: "Task deleted successfully", res: 'ok' });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at deletetask");
        res.json({ msg: "error occured at deletetask", res: "no" });
    }
}



module.exports={gettask, addtask, getprofile,finishtask, getalltask,deletetask}