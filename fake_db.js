const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');​
// const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory'); 

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false}
}, { sequelize, modelName: 'User' });    


console.log(User===sequelize.models.User);

class Session extends Model {}

Session.init({
    // sessionId: DataTypes.UUID,
    sessionID: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    },
//     user: DataTypes.STRING,
user:{
    type: DataTypes.STRING,
    allowNull: false
},
//     timeOfLogin: DataTypes.DATE
timeOfLogin:{
    type: DataTypes.STRING,
    allowNull: false
},
}, { sequelize, modelName: 'Session' });

console.log(Session===sequelize.models.Session);


(async() => {
    await sequelize.sync({force:true})
}
)
(

)
// ​;

let models = {
    User: User,
    Session: Session
}

module.exports = models
// module.exports = User;
// module.exports = Session;