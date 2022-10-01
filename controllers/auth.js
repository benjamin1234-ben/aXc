import { hash, genSalt, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../db/models/users.js";

const { sign } = jsonwebtoken;

const createAccount = async (req, res) => {
    try {
        const salt = await genSalt();
        const _password = await hash(req.body.password, salt);

        const user = new UserModel({
            email : req.body.email,
            password : _password
        }).save()
        .then(doc => {
            console.log(doc);
            res.redirect("/success");
        }).catch(err => console.log(err));
    } catch(err) {
        console.log(err);
    }
}

const Authentication = async (req, res) => {
    try {
        UserModel.findOne({
            email : req.body.email
        }).then(async (doc) => {
            console.log(doc);
            try {
                const _password = await compare(req.body.password, doc.password);

                if(_password) {
                    const jwt = sign(req.body.email, process.env.JWT_ACCESS_TOKEN);
                    res.json({ accessTK : jwt});
                } else {
                    res.sendStatus(401);
                }
            } catch(err) {
                console.log(err);
            }
        })
    } catch(err) {
        console.log(err);
    }
}

const auth = { createAccount, Authentication };

export default auth;