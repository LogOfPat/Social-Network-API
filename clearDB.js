const connection = require('./config/connections');


connection.once('open', async () => {
    connection.dropDatabase();
    console.info('Db dropped');
    process.exit(0);
})
