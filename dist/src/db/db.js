"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.db = {
    courses: [
        { id: 1, title: 'one plate', studentsCount: 10 },
        { id: 2, title: 'two balls', studentsCount: 10 },
        { id: 3, title: 'three cups', studentsCount: 10 },
        { id: 4, title: 'four trees', studentsCount: 10 },
    ],
    users: [
        { id: 1, userName: 'marina' },
        { id: 2, userName: 'alex' },
    ],
    studentCourseBindings: [
        { studentId: 1, courseId: 1, date: new Date(2023, 10, 1) },
        { studentId: 1, courseId: 2, date: new Date(2023, 10, 1) },
        { studentId: 2, courseId: 2, date: new Date(2023, 10, 1) },
    ]
};
