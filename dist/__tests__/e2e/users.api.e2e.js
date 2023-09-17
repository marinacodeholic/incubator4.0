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
const usersTestManager_1 = require("../utils/usersTestManager");
const getRequest = () => {
    return (0, supertest_1.default)(app_1.app);
};
describe('test for /users', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete('/__test__/data');
    }));
    it('should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest()
            .get(app_1.RouterPaths.users)
            .expect(200, []);
    }));
    it('should return 404 for not existing entity', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.users}/1`)
            .expect(404);
    }));
    it('shouldn\'t create entity with incorr input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { userName: '' };
        yield usersTestManager_1.usersTestManager.createUser(data, utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.RouterPaths.users)
            .expect(utils_1.HTTP_STATUSES.OK_200, []);
    }));
    let createdEntity1 = null;
    it('should create Entity1 with corr input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { userName: 'Mark' };
        const createResponse = yield usersTestManager_1.usersTestManager.createUser(data);
        createdEntity1 = createResponse.body;
        expect(createdEntity1).toEqual({
            id: expect.any(Number),
            userName: data.userName
        });
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.RouterPaths.users)
            .expect(utils_1.HTTP_STATUSES.OK_200, [createdEntity1]);
    }));
    let createdEntity2 = null;
    it('create new Entity2', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { userName: 'Mark 2' };
        const createResponse = yield usersTestManager_1.usersTestManager.createUser(data);
        createdEntity2 = createResponse.body;
        expect(createdEntity2).toEqual({
            id: expect.any(Number),
            userName: data.userName
        });
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.RouterPaths.users)
            .expect(200, [createdEntity1, createdEntity2]);
    }));
    it('shouldnt update entity THAt not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const data1 = { userName: 'Markusha' };
        yield (0, supertest_1.default)(app_1.app)
            .put(`${app_1.RouterPaths.users}/${-343}`)
            .send(data1)
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_404);
    }));
    it('shouldnt update Entity with incorr input data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .put(`${app_1.RouterPaths.users}/${createdEntity1.id}`)
            .send({ title: '' })
            .expect(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.users}/${createdEntity1.id}`)
            .expect(utils_1.HTTP_STATUSES.OK_200);
    }));
    it('should update entity with corr data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data2 = { userName: 'MarkKim' };
        yield (0, supertest_1.default)(app_1.app)
            .put(`${app_1.RouterPaths.users}/${createdEntity1.id}`)
            .send(data2)
            .expect(utils_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.users}/${createdEntity1.id}`)
            .expect(utils_1.HTTP_STATUSES.OK_200, Object.assign(Object.assign({}, createdEntity1), { userName: data2.userName }));
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.users}/${createdEntity2.id}`)
            .expect(utils_1.HTTP_STATUSES.OK_200, createdEntity2);
    }));
    it('should delete', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app)
            .delete(`${app_1.RouterPaths.users}/${createdEntity2.id}`)
            .expect(utils_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(app_1.app)
            .delete(`${app_1.RouterPaths.users}/${createdEntity1.id}`)
            .expect(utils_1.HTTP_STATUSES.NO_CONTENT_204);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.users}/${createdEntity1.id}`)
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(app_1.app)
            .get(`${app_1.RouterPaths.users}/${createdEntity2.id}`)
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_404);
        yield (0, supertest_1.default)(app_1.app)
            .get(app_1.RouterPaths.users)
            .expect(200, []);
    }));
    // afterAll(done => {
    //     done()
    // })
});
