import authenticationModel from "../models/authentication.model.js";
import bcrypt from 'bcrypt';
import mail from '../mail/index.js'
import token from '../token/index.js'
import ejs from 'ejs'
import path from 'path'


export default {
    register: async function (req, res) {
        try {
            let { status, message, data } = await authenticationModel.register({
                ...req.body,
                password: await bcrypt.hash(req.body.password, 10)
            });

            if (status) {
                /* Email Xác Thực */
                mail.sendMail({
                    to: req.body.email,
                    subject: "Xác thực email!",
                    html: `<a href='http://127.0.0.1:3000/apis/v1/authen/email-confirm/${token.createToken(data)}'>Xác thực</a>`
                })
            }

            /* Chỉ báo đăng ký thành công => login */
            return res.status(status ? 200 : 213).json({
                message
            })
        } catch (err) {
            return res.status(500).json({
                message: "fail"
            })
        }
    },
    emailConfirm: async function (req, res) {
        try {
            let dataToken = token.verifyToken(req.params.token);
            if (!dataToken) {
                return res.status(500).json({
                    message: "token không đúng!"
                })
            }

            let { status, message, data } = await authenticationModel.update(dataToken.data.email, {
                email_confirm: true
            })

            return res.status(status ? 200 : 213).send(status ? await ejs.renderFile(path.join(__dirname, "../templates/email.confirm.ejs"), { dataToken }) : "xác thực fail")
        } catch (err) {
            console.log('err', err)
            return res.status(500).json({
                message: "Server fail!"
            })
        }
    },
    login: async function (req, res) {
        console.log("okla", req.body)
        try {
            //người dùng không tồn tại!
            let user = await authenticationModel.findUserByEmail(req.body.email);
            if (!user.status) {
                return res.status(213).json({
                    message: "người dùng không tồn tại!"
                })
            }

            //mật khẩu không chính xác!
            console.log("req.body.password", req.body.password)
            console.log("user.password", user.password)
            let checkPassword = await bcrypt.compare(req.body.password, user.data.password);



            if (user.data.ipaddress1 != user.data.ipaddress2) {
                mail.sendMail({
                    to: req.body.email,
                    subject: "Có phải bạn đã đăng nhập tài khoản!",
                    html: `<h2>Tìm thấy ai đó đang cố đăng nhập tài khoản của bạn từ một địa chỉ IP khác</h2>`
                })
            }



            if (!checkPassword) {
                return res.status(213).json({
                    message: "mật khẩu không chính xác!"
                })
            }

            //đăng nhập thành công
            return res.status(200).json({
                token: token.createToken(user)
            })
        } catch (err) {
            console.log("lỗi", err)
            return res.status(500).json({
                message: "lỗi!"
            })
        }
    },
    checkToken: async function (req, res) {
        try {
            let dataToken = token.verifyToken(req.params.token);
            if (!dataToken) {
                return res.status(500).json({
                    message: "token không đúng!"
                })
            }

            return res.status(dataToken ? 200 : 213).json({
                data: dataToken ? dataToken.data : null
            })
        } catch (err) {
            return res.status(500).json({
                message: "Server fail!"
            })
        }
    },
}