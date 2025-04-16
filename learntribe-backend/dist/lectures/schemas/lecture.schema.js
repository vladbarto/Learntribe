"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LectureSchema = exports.Lecture = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Lecture = class Lecture {
    title;
    description;
    domain;
    startDate;
    endDate;
    numberOfSessions;
    price;
    offer;
    languages;
    totalPlaces;
    totalEnrolled;
};
exports.Lecture = Lecture;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Lecture.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Lecture.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Lecture.prototype, "domain", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Lecture.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Lecture.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], Lecture.prototype, "numberOfSessions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Lecture.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Lecture.prototype, "offer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: true }),
    __metadata("design:type", Array)
], Lecture.prototype, "languages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Lecture.prototype, "totalPlaces", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Lecture.prototype, "totalEnrolled", void 0);
exports.Lecture = Lecture = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Lecture);
exports.LectureSchema = mongoose_1.SchemaFactory.createForClass(Lecture);
//# sourceMappingURL=lecture.schema.js.map