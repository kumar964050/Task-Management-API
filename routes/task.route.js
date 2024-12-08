const router = require("express").Router();

const controller = require("../controllers/task.controller");

const {
  validateParams,
  validateFields,
} = require("../middlewares/validations");
const protect = require("../middlewares/protect");

router.use(protect);

router
  .route("/")
  .post(validateFields, controller.addTask)
  .get(controller.getTasks);

router
  .route("/:id")
  .get(validateParams, controller.getTaskById)
  .put(validateParams, validateFields, controller.updateTask)
  .delete(validateParams, controller.deleteTask);

module.exports = router;
