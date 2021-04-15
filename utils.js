const { User } = require('./fake_db.js')
async function matchCredentials(requestBody) {
    let user = User.findOne({
        where: {
            username: requestBody
        }
    }
)
// ;​

    if (user !== undefined &&
        requestBody.password === user.password) {
        return true
    } else {
        return false
    }
}
module.exports = matchCredentials