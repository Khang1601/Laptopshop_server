import nodemailer from 'nodemailer';

export default {
    sendMail: async function(option) {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'khang.nodejs@gmail.com',
                    pass: 'xsug gwoi gxqk wdgv'
                }
            });
    
            var mailOptions = {
                from: 'khang.nodejs@gmail.com',
                ...option
            };

            await transporter.sendMail(mailOptions);

            return true
        }catch(err) {
            return false
        }
    }
}


// var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };