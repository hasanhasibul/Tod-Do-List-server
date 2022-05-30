const express =  require('express')
const router = express.Router();
const authVerifyController = require('../middleware/authVerifyController')
const profileController = require('../controller/profileController');
const todoListController = require('../controller/todoListController');


router.post('/create-profile',profileController.createProfile)
router.post('/login-profile',profileController.loginProfile)


router.get('/read-profile',authVerifyController.verifyToken,profileController.readProfile);
router.post('/update-profile',authVerifyController.verifyToken,profileController.updateProfile);

router.post('/createTodo',authVerifyController.verifyToken,todoListController.createTodo);
router.get('/readTodo',authVerifyController.verifyToken,todoListController.readTodo);
router.post('/updateTodo',authVerifyController.verifyToken,todoListController.updateTodo);
router.post('/updateTodoStatus',authVerifyController.verifyToken,todoListController.updateTodoStatus);
router.post('/removeTodoItem',authVerifyController.verifyToken,todoListController.removeTodoItem);
router.post('/selectTodoByStatus',authVerifyController.verifyToken,todoListController.selectTodoByStatus);
router.post('/selectTodoByDate',authVerifyController.verifyToken,todoListController.selectTodoByDate);





module.exports = router ;