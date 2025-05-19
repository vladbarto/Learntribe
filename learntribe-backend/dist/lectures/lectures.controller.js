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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LecturesController = void 0;
const common_1 = require("@nestjs/common");
const lectures_service_1 = require("./lectures.service");
const create_lecture_dto_1 = require("./dto/create-lecture.dto");
const update_lecture_dto_1 = require("./dto/update-lecture.dto");
const query_lecture_dto_1 = require("./dto/query-lecture.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let LecturesController = class LecturesController {
    lecturesService;
    constructor(lecturesService) {
        this.lecturesService = lecturesService;
    }
    create(createLectureDto) {
        return this.lecturesService.create(createLectureDto);
    }
    findAll(query) {
        return this.lecturesService.findAll(query);
    }
    findOne(id) {
        return this.lecturesService.findOne(id);
    }
    update(id, updateLectureDto) {
        return this.lecturesService.update(id, updateLectureDto);
    }
    remove(id) {
        return this.lecturesService.remove(id);
    }
    async incrementEnrollment(id) {
        const updatedLecture = await this.lecturesService.incrementTotalEnrolled(id);
        if (!updatedLecture) {
            throw new common_1.NotFoundException(`Lecture with ID ${id} not found`);
        }
        return updatedLecture;
    }
    findByTeacher(teacherId) {
        return this.lecturesService.findByTeacher(teacherId);
    }
};
exports.LecturesController = LecturesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('one'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lecture_dto_1.CreateLectureDto]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_lecture_dto_1.QueryLectureDto]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lecture_dto_1.UpdateLectureDto]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('increment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "incrementEnrollment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('teacher/:teacherId'),
    __param(0, (0, common_1.Param)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "findByTeacher", null);
exports.LecturesController = LecturesController = __decorate([
    (0, common_1.Controller)('lectures'),
    __metadata("design:paramtypes", [lectures_service_1.LecturesService])
], LecturesController);
//# sourceMappingURL=lectures.controller.js.map