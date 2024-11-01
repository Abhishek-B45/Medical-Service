const express = require('express');
const userController = require('../Controllers/UserController');
const validate = require('../Middlewares/validateMiddleware');
const { userSchema, userUpdateSchema } = require('../Middlewares/Joi_Validations/userSchema');
const authMiddleware = require('../Middlewares/authorizationMiddleware');
const validateAsync = require('../Middlewares/validateAsyncMiddleware');
const userRouter = express.Router();

userRouter
    .post('/', validateAsync(userSchema), userController.createUser)
    .get('/verify', userController.verifyCreateUser)
    .get('/:userId/permissions/:permissionName', authMiddleware, userController.checkUserPermission)
    .get('/', authMiddleware, userController.getAllUsers)
    .get('/:id', authMiddleware, userController.getUserById)
    .put('/:id', validate(userUpdateSchema), authMiddleware, userController.updateUser)
    .delete('/:id', authMiddleware, userController.deleteUser)
    .delete('/user_range/:start_id/to/:end_id', authMiddleware, userController.deleteUserRanges)

module.exports = userRouter;
