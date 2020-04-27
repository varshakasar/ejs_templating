const express = require('express')
const nodemailer = require('nodemailer')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const app = express()

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: 'emailid_here',
        pass: 'password_here'
    },
    debug: true
})

app.set('view engine', 'ejs')
app.use('/views', express.static(path.join(__dirname, 'views')))

app.get('/generate_otp', async (req, res, next) => {
    let data = {
        userName: 'varsha@cyperts.net',
        otpS: '123456'
    }
    let htmlTemplate
    ejs.renderFile('./views/send_otp.ejs', {data:data},(err,html) => {
        console.log(`HTML: ${html}`);
        htmlTemplate = `${html}`
    })
    let mailOptions = {
        from: 'cypertsdigitalsolution@gmail.com',
        to: 'varsha@cyperts.net',
        subject: 'Your One Time Password',
        // html: "Hello,<br> Your One Time Password....<br>" + otpS
        html: htmlTemplate
    }
    transport.sendMail(mailOptions, (err, result) => {
        if (result) {
            console.log('email has been sent....')
            res.json({
                success: true,
                status: 'success',
                message: `OTP has been send to ${data.userName}`
            })
        } else {
            return res.json({ success: false, message: 'Oops!something went wrong..' })
        }
    })
})


app.listen(4000, () => {
    console.log('app listen on port 4000')
})
