////////////////
///// APP /////
//////////////


// Require the modules
const express    =  require ('express')
const bodyParser =  require('body-parser')
const sequelize  =  require('sequelize')
const session    =  require('express-session')
const bcrypt     =  require('bcrypt-nodejs')
const sass   	 =  require('node-sass')
const router     = express.Router()

// Initiate body parser
router.use(bodyParser.urlencoded({ extended: true }));

// Initiate session 
router.use(session({
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

const db         =  new sequelize('cotree', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD,{
						host: 'localhost',
						dialect: 'postgres'
					});

/////////////////////
///// DATABASE /////
///////////////////

// Define user table and properties
let User = db.define('user', {
	name: {type: sequelize.STRING, unique: true},
	lastname: {type: sequelize.STRING, unique: true},
	email: {type: sequelize.STRING, unique: true},
	password: sequelize.STRING
});

// Sync database 
db.sync({force:true}).then( ()=>{
	bcrypt.hash('tree', null, null, (err, hash) =>{
		User.create({
			name: 'Tree',
			lastname: 'Hugger',
			email: 'a@b',
			password: hash
		})
	}), (err) => {
		console.log('Database Sync Failed')
		console.log(err)
	}
}) 


/////////////////////////
///// ROOT / INDEX /////
///////////////////////

router.route('/')
	.get((req,res)=> {
		res.render('index')
	})



router.route('/index')
	.get((req,res)=> {
		res.render('index')
	})


//////////////////////
////// EXPORT ///////
////////////////////

module.exports = router

