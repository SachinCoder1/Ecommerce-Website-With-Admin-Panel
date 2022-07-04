const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if(!token) return res.status(400).json({msg: "Make sure you are logged In."})
      
        //  Verify the token
        jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user)=>{
            if(err) return res.status(500).json({msg: "Token Not valid"});
            req.user = user;
            next();
        })

    } catch (error) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth;