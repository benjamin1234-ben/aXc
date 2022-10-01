import jsonwebtoken from "jsonwebtoken";

const { verify } = jsonwebtoken;

const Authorization = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if(authHeader) {
        const accessTK =  authHeader.slice(7);

        if(accessTK) {
            verify(accessTK, process.env.JWT_ACCESS_TOKEN, (err, user) => {
                if(err) {
                    res.sendStatus(500);
                } else {
                    console.log(user);
                    res.json(user);
                }
            })
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }

    next();
}

export default Authorization;