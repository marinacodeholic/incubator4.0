"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// for .map
// app.post('/courses', (req: RequestWithBody<CreateCourseModel>,
//                       res: Response<CourseViewModel>) => {
//
//     if (!req.body.title){
//         res.sendStatus(400)
//         return;
//     }
//
//     const createCourse: CourseType = {
//         id: +(new Date()),
//         title: req.body.title,
//         studentsCount: 10
//     }
//
//     db.courses.push(createCourse); // ОБЯЗАТЕЛЬНО ЛОЖИМ В БД!!
//
//     //res.status(201).json(createCourse)
//     res.status(HTTP_STATUSES.CREATED_201) //иначе будет статус 200ок. 201 created
//     res.json(getCourseViewModel(createCourse))
// })
