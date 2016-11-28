// require modules
const sequelize = require( 'sequelize' )

// Container object
let db = {
	module: {}
}


// Initiate database 
db.connection       =  new sequelize('cotree', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
						host: 'localhost',
						dialect: 'postgres'
					});

db.user = db.connection.define('user', {
	fbid: sequelize.BIGINT,
	firstname: {type: sequelize.STRING, unique: true},
	lastname: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true}
})


db.conn.sync( {'force': true} ).then(

	() => { 
		console.log ( 'Synchronized' )
	},
	(err) => { console.log('Synchronize failed: ' + err) } 
	)

module.exports = db