const sequelize = require('./database'); // Import sequelize instance from your database config

// Sync models with database
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false });  // Set 'force: false' to avoid dropping tables every time
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

module.exports = syncDatabase;
