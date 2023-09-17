"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../src/app");
const utils_1 = require("../../src/utils");
const getRequest = () => {
    return (0, supertest_1.default)(app_1.app);
};
describe('/course', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete('/__test__/data');
    }));
    it('should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest()
            .get(app_1.RouterPaths.courses)
            .expect(200, []);
    }));
    it('should return 404 for not existing course', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.courses}/1`)
            .expect(404);
    }));
    it('shouldn\'t create course with corr input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .post(app_1.RouterPaths.courses)
            .send({ title: '' })
            .expect(400);
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.RouterPaths.courses)
            .expect(200, []);
    }));
    let createdCourse1 = null;
    it('should create course1 with corr input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: 'love code' };
        const createResponse = yield (0, supertest_1.default)(app_1.app)
            .post(app_1.RouterPaths.courses)
            .send(data)
            .expect(201);
        createdCourse1 = createResponse.body;
        expect(createdCourse1).toEqual({
            id: expect.any(Number),
            title: data.title
        });
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.RouterPaths.courses)
            .expect(200, [createdCourse1]);
    }));
    it('shouldnt update course witth incorr input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`${app_1.RouterPaths.courses}/${createdCourse1.id}`)
            .send({ title: '' })
            .expect(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.courses}/${createdCourse1.id}`)
            .expect(utils_1.HTTP_STATUSES.OK_200);
    }));
    it('shouldnt update course THAt not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const data1 = { title: 'crack code' };
        yield (0, supertest_1.default)(app_1.app)
            .put(`${app_1.RouterPaths.courses}/${-343}`)
            .send(data1)
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    let createdCourse2 = null;
    it('create new course2', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: 'love 2 code' };
        const createResponse = yield (0, supertest_1.default)(app_1.app)
            .post(app_1.RouterPaths.courses)
            .send(data)
            .expect(utils_1.HTTP_STATUSES.CREATED_201);
        createdCourse2 = createResponse.body;
        expect(createdCourse2).toEqual({
            id: expect.any(Number),
            title: data.title
        });
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.RouterPaths.courses)
            .expect(200, [createdCourse1, createdCourse2]);
    }));
    it('should update course with corr data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data2 = { title: 'crack code' };
        yield (0, supertest_1.default)(app_1.app)
            .put(`${app_1.RouterPaths.courses}/${createdCourse1.id}`)
            .send(data2)
            .expect(utils_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.courses}/${createdCourse1.id}`)
            .expect(utils_1.HTTP_STATUSES.OK_200, Object.assign(Object.assign({}, createdCourse1), { title: data2.title }));
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.courses}/${createdCourse2.id}`)
            .expect(utils_1.HTTP_STATUSES.OK_200, createdCourse2);
    }));
    it('should delete', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete(`${app_1.RouterPaths.courses}/${createdCourse2.id}`)
            .expect(utils_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(app_1.app)
            .delete(`${app_1.RouterPaths.courses}/${createdCourse1.id}`)
            .expect(utils_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.courses}/${createdCourse1.id}`)
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.courses}/${createdCourse2.id}`)
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.RouterPaths.courses)
            .expect(200, []);
    }));
    afterAll(done => {
        done();
    });
});
