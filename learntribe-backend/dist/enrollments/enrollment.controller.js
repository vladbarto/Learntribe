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
exports.EnrollmentsController = void 0;
const common_1 = require("@nestjs/common");
const enrollment_service_1 = require("./enrollment.service");
const create_enrollment_dto_1 = require("./dto/create-enrollment.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let EnrollmentsController = class EnrollmentsController {
    enrollmentsService;
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    async enroll(body) {
        try {
            return await this.enrollmentsService.enroll(body);
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async alreadyEnrolled(lectureId, userId) {
        try {
            return await this.enrollmentsService.alreadyEnrolled(userId, lectureId);
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
    async getEnrollmentsByLecture(lectureId) {
        try {
            const enrollments = await this.enrollmentsService.findEnrollmentByLectureId(lectureId);
            return enrollments;
        }
        catch (err) {
            throw new common_1.BadRequestException(err.message);
        }
    }
};
exports.EnrollmentsController = EnrollmentsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('enroll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_enrollment_dto_1.CreateEnrollmentDto]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "enroll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('already-enrolled/:lectureId/:userId'),
    __param(0, (0, common_1.Param)('lectureId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "alreadyEnrolled", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('lecture/:lectureId'),
    __param(0, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "getEnrollmentsByLecture", null);
exports.EnrollmentsController = EnrollmentsController = __decorate([
    (0, common_1.Controller)('enrollments'),
    __metadata("design:paramtypes", [enrollment_service_1.EnrollmentsService])
], EnrollmentsController);
//# sourceMappingURL=enrollment.controller.js.map