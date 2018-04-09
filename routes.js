const router = require("koa-router")();
const RootController = require("./controllers/root-controller");
const EmployerController = require("./controllers/employer-controller");
const EmployeeController = require("./controllers/employee-controller");
const PayScheduleController = require("./controllers/pay-schedule-controller");
const PayInstructionController = require("./controllers/pay-instruction-controller");
const PayRunController = require("./controllers/pay-run-controller");
const CommentaryController = require("./controllers/commentary-controller");
const PaySlipController = require("./controllers/pay-slip-controller");

let rootController = new RootController();
let employerController = new EmployerController();
let employeeController = new EmployeeController();
let payScheduleController = new PayScheduleController();
let payInstructionController = new PayInstructionController();
let payRunController = new PayRunController();
let commentaryController = new CommentaryController();
let paySlipController = new PaySlipController();

router
    // root/get started
    .get("/", async ctx => await rootController.getRootView(ctx))

    // employer
    .get("/employer", async ctx => await employerController.getEmployers(ctx))
    .post("/employer", async ctx => await employerController.addNewEmployer(ctx))
    .get("/employer/new", async ctx => await employerController.requestNewEmployer(ctx))
    .get("/employer/:id", async ctx => await employerController.getEmployerDetails(ctx))
    .post("/employer/:id", async ctx => await employerController.saveEmployerDetails(ctx))
    .post("/employer/:id/delete", async ctx => { })

    // pay schedule
    .get("/employer/:employerId/paySchedule/new", async ctx => await payScheduleController.requestNewSchedule(ctx))
    .post("/employer/:employerId/paySchedule", async ctx => await payScheduleController.addNewSchedule(ctx))
    .get("/employer/:employerId/paySchedule/:payScheduleId", async ctx => await payScheduleController.getScheduleDetails(ctx))
    .post("/employer/:employerId/paySchedule/:payScheduleId", async ctx => await payScheduleController.saveScheduleDetails(ctx))
    .post("/employer/:employerId/paySchedule/:payScheduleId/delete", async ctx => await payScheduleController.deleteSchedule(ctx))

    // employee
    .get("/employer/:employerId/employee/new", async ctx => await employeeController.requestNewEmployee(ctx))
    .post("/employer/:employerId/employee", async ctx => await employeeController.addNewEmployee(ctx))
    .get("/employer/:employerId/employee/:employeeId", async ctx => await employeeController.getEmployeeDetails(ctx))
    .post("/employer/:employerId/employee/:employeeId", async ctx => await employeeController.saveEmployeeDetails(ctx))
    .get("/employer/:employerId/employee/:employeeId/leaver-details", async ctx => { })
    .get("/employer/:employerId/employee/:employeeId/p45", async ctx => { })
    .get("/employer/:employerId/employee/:employeeId/p60", async ctx => await employeeController.request60(ctx))
    .post("/employer/:employerId/employee/:employeeId/p60", async ctx => await employeeController.downloadP60(ctx))
    .post("/employer/:employerId/employee/:employeeId/delete", async ctx => { })

    // pay instruction
    .get("/employer/:employerId/employee/:employeeId/payInstruction/new", async ctx => await payInstructionController.requestNewInstruction(ctx))
    .post("/employer/:employerId/employee/:employeeId/payInstruction", async ctx => payInstructionController.addNewInstruction(ctx))
    .get("/employer/:employerId/employee/:employeeId/payInstruction/:payInstructionId", async ctx => payInstructionController.getInstruction(ctx))
    .post("/employer/:employerId/employee/:employeeId/payInstruction/:payInstructionId", async ctx => payInstructionController.saveInstruction(ctx))
    .post("/employer/:employerId/employee/:employeeId/payInstruction/:payInstructionId/delete", async ctx => payInstructionController.deleteInstruction(ctx))

    // pay run
    .get("/employer/:employerId/payRun", async ctx => await payRunController.requestNewRun(ctx))
    .post("/employer/:employerId/payRun", async ctx => await payRunController.startNewRun(ctx))
    .get("/employer/:employerId/payRun/job/:jobId", async ctx => await payRunController.getJobDetails(ctx))
    .get("/employer/:employerId/paySchedule/:payScheduleId/payRun/:payRunId", async ctx => await payRunController.getPayRunInfo(ctx))

    // comentary
    .get("/employer/:employerId/employee/:employeeId/commentary/:commentaryId", async ctx => await commentaryController.getCommentary(ctx))

    // pay slip
    .get("/employer/:employerId/employee/:employeeId/paySlipData/:code/:taxPeriod/:taxYear", async ctx => await paySlipController.getPaySlipData(ctx))
;

module.exports = router.routes();