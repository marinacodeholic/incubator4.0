"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersRouter = exports.mapEntityToViewModel = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../../utils");
const mapEntityToViewModel = (dbEntity) => {
    return {
        id: dbEntity.id,
        userName: dbEntity.userName
    };
};
exports.mapEntityToViewModel = mapEntityToViewModel;
const getUsersRouter = (db) => {
    const router = express_1.default.Router();
    router.post('/', (req, res) => {
        if (!req.body.userName) {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const createdEntity = {
            id: +(new Date()),
            userName: req.body.userName
        };
        db.users.push(createdEntity); //обязательно ложим в БД
        res // обязательно следить за порядком ответа. иначе будет статус 200ок!.
            .status(utils_1.HTTP_STATUSES.CREATED_201)
            .json((0, exports.mapEntityToViewModel)(createdEntity));
    });
    router.get('/', (req, res) => {
        let foundEntities = db.users;
        if (req.query.userName) {
            foundEntities = foundEntities
                .filter(c => c.userName.indexOf(req.query.userName) > -1);
        }
        res.json(foundEntities.map(exports.mapEntityToViewModel));
    });
    router.get('/:id', (req, res) => {
        const foundUser = db.users.find(c => c.id === +req.params.id);
        if (!foundUser) {
            res.sendStatus(404);
            return;
        }
        res.json((0, exports.mapEntityToViewModel)(foundUser));
    });
    router.delete('/:id', (req, res) => {
        db.users = db.users.filter(c => c.id !== +req.params.id);
        res.sendStatus(utils_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    router.put('/:id', (req, res) => {
        if (!req.body.userName) {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const foundUser = db.users.find(c => c.id === +req.params.id);
        if (!foundUser) {
            res.sendStatus(404);
            return;
        }
        foundUser.userName = req.body.userName;
        res
            .sendStatus(utils_1.HTTP_STATUSES.NO_CONTENT_204)
            .json(foundUser);
    });
    return router;
};
exports.getUsersRouter = getUsersRouter;
