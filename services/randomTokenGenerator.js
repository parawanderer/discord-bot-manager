const crypto = require('crypto');

const generateToken = async (length) => {
    const token = await new Promise(
        (resolve, reject) => 
            crypto.randomBytes(Math.floor(length/2), (err, buffer) => { 
                if (err) reject("Failure generating token");
                resolve(buffer.toString('hex')) 
            })
        );
    
    return token;
};

module.exports = generateToken;