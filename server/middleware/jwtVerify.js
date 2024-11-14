import jwt from "jsonwebtoken";




const jwtVerify = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Authorization denied" });
    }

    const splittoken = token.split(" ");
    const jwttoken = splittoken[1];

    try {
        const decoded  = jwt.verify(jwttoken , "secret");

        if(decoded)
        {
            req.user = decoded;
            next();
        }
        else
        {
            throw new Error("Invalid Token");
        }
    } catch (error) {
        console.error("jwt verification error :", error);
        return res.status(401).json({ message: "Authorization denied" });
    }
}


export default jwtVerify;