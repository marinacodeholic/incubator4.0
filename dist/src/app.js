"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonBodyMiddleware = exports.RouterPaths = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const courses_router_1 = require("./features/courses/courses.router");
const tests_1 = require("./routes/tests");
const db_1 = require("./db/db");
const getInterestingRouter_1 = require("./routes/getInterestingRouter");
const users_router_1 = require("./features/users/users.router");
exports.app = (0, express_1.default)();
exports.RouterPaths = {
    courses: '/courses',
    users: '/users',
    __test__: '/__test__'
};
exports.jsonBodyMiddleware = express_1.default.json();
exports.app.use(exports.jsonBodyMiddleware);
exports.app.use("/courses", (0, courses_router_1.getCoursesRouter)(db_1.db)); //говорим апп управляться с GetCourseRouter.
//ИЗМЕНЕНИЯ ПОСЛЕ "/courses", в основном коде нужно прописывать пусть БЕЗ /courses
exports.app.use("/__test__", (0, tests_1.getTestsRouter)(db_1.db));
exports.app.use("/interesting", (0, getInterestingRouter_1.getInterestingRouter)(db_1.db));
exports.app.use("/users", (0, users_router_1.getUsersRouter)(db_1.db));
