const app = require('./express/app');
const db = require('./models')
const PORT = 5000;

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await db.sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function syncDatabase() {
	console.log(`Sync database models...`);
	try {
		await db.sequelize.sync({ alter: true, match: /_development$/ });
		console.log("All models were synchronized successfully.");
	} catch (error) {
		console.log('Sync disabled or error:');
		console.log(error.message);
	}
}

async function init() {
	await assertDatabaseConnectionOk();
	await syncDatabase();

	console.log(`Starting Sequelize + Express example on port ${PORT}...`);

	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}`);
	});
}

init();
