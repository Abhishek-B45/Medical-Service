const { Op } = require("sequelize");
const { fetchModelData } = require("../Models/ModelOperator/DataModel");

class UserLogService {
    // Create a new user log
    async createUserLog(data) {
        return await fetchModelData("MEDSRV449854", 'UserLog', 'UserLog', 'create', data);
    }

    // Get all user logs
    async getAllUserLogs(health_id) {
        return await fetchModelData(health_id, 'UserLog', 'UserLog', 'findAll');
    }

    // Get user log by ID
    async getUserLogById(health_id, id) {
        return await fetchModelData(health_id, 'UserLog', 'UserLog', 'findOne', { id });
    }

    // Update a user log by ID
    async updateUserLog(health_id, id, data) {
        return await fetchModelData(health_id, 'UserLog', 'UserLog', 'update', { id, ...data });
    }

    // Delete a user log by ID
    async deleteUserLog(health_id, id) {
        return await fetchModelData(health_id, 'UserLog', 'UserLog', 'destroy', { id });
    }

    // Delete logs in a date range
    async deleteLogsInRange(health_id, startDate, endDate) {
        return await fetchModelData(health_id, 'UserLog', 'UserLog', 'destroy', {
            login_at: {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            },
        });
    }
}

module.exports = new UserLogService();








// const { Op } = require('sequelize');
// const { UserLogModel } = require('../Models/ModelOperator/DataModel');
// const { UserLog } = require('../Models/Association');


// class UserLogService {
//     // Common function to get the UserLog model
//     async getUserLogModel() {
//         const userLog = await UserLogModel('MEDSRV718079');
//         if (!userLog) {
//             throw new Error('UserLogModel is undefined or returned an invalid object.');
//         }
//         return userLog;
//     }

//     async createUserLog(data) {
//         try {
//             const userLog = await this.getUserLogModel('MEDSRV718079');
//             return await userLog.create(data);
//         } catch (error) {
//             throw new Error(`Failed to create user log: ${error.message}`);
//         }
//     }

//     async getAllUserLogs() {
//         try {
//             const userLog = await this.getUserLogModel('MEDSRV718079');
//             const logs = await userLog.findAll({});
//             if (!logs || logs.length === 0) {
//                 throw new Error('No user logs found.');
//             }
//             return logs;
//         } catch (error) {
//             throw new Error(`Failed to fetch user logs: ${error.message}`);
//         }
//     }

//     async getUserLogById(id) {
//         try {
//             const userLog = await this.getUserLogModel('MEDSRV718079');
//             const log = await userLog.findByPk(id);
//             if (!log) {
//                 throw new Error('User log not found.');
//             }
//             return log;
//         } catch (error) {
//             throw new Error(`Failed to fetch user log by ID: ${error.message}`);
//         }
//     }

//     async updateUserLog(id, data) {
//         try {
//             const userLog = await this.getUserLogModel('MEDSRV718079');
//             const log = await userLog.findByPk(id);
//             if (!log) {
//                 throw new Error('User log not found.');
//             }
//             await log.update(data);
//             return log;
//         } catch (error) {
//             throw new Error(`Failed to update user log: ${error.message}`);
//         }
//     }

//     async deleteUserLog(id) {
//         try {
//             const userLog = await this.getUserLogModel('MEDSRV718079');
//             const log = await userLog.findByPk(id);
//             if (!log) {
//                 throw new Error('User log not found.');
//             }
//             await log.destroy();
//             return log;
//         } catch (error) {
//             throw new Error(`Failed to delete user log: ${error.message}`);
//         }
//     }

//     async deleteLogsInRange(startDate, endDate) {
//         try {
//             const userLog = await this.getUserLogModel('MEDSRV718079');
//             const logsDeleted = await userLog.destroy({
//                 where: {
//                     login_at: {
//                         [Op.between]: [new Date(startDate), new Date(endDate)],
//                     },
//                 },
//             });
//             if (logsDeleted === 0) {
//                 throw new Error('No user logs found in the specified date range.');
//             }
//             return logsDeleted;
//         } catch (error) {
//             throw new Error(`Failed to delete logs in date range: ${error.message}`);
//         }
//     }
// }
// module.exports = new UserLogService();




// class UserLogService {
//     async createUserLog(data) {
//         return await UserLog.create(data);
//     }

//     async getAllUserLogs() {
//         return await UserLog.findAll();
//         // return await UserLogModel('MEDSRV718079');
//     }

//     async getUserLogById(id) {
//         return await UserLog.findByPk(id);
//     }

//     async updateUserLog(id, data) {
//         const userLog = await UserLog.findByPk(id);
//         if (!userLog) throw new Error('User Log not found');
//         return await UserLog.update(data, { where: { id } });
//     }

//     async deleteUserLog(id) {
//         const userLog = await UserLog.findByPk(id);
//         if (!userLog) throw new Error('User Log not found');
//         return await UserLog.destroy({ where: { id } });
//     }

//     async deleteLogsInRange(startDate, endDate) {
//         return UserLog.destroy({
//             where: {
//                 login_at: {
//                     [Op.between]: [new Date(startDate), new Date(endDate)],
//                 },
//             },
//         });
//     }
// }

// module.exports = new UserLogService();
