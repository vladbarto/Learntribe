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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enrollment_schema_1 = require("./schemas/enrollment.schema");
let EnrollmentsService = class EnrollmentsService {
    enrollmentModel;
    constructor(enrollmentModel) {
        this.enrollmentModel = enrollmentModel;
    }
    async enroll(request) {
        const exists = await this.enrollmentModel.findOne(request);
        if (exists)
            throw new Error('Already enrolled');
        const enrollment = new this.enrollmentModel(request);
        return enrollment.save();
    }
    async alreadyEnrolled(userId, lectureId) {
        const enrollment = await this.enrollmentModel
            .findOne({
            userId: new mongoose_2.Types.ObjectId(userId),
            lectureId: new mongoose_2.Types.ObjectId(lectureId),
        })
            .exec();
        return !!enrollment;
    }
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(enrollment_schema_1.Enrollment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EnrollmentsService);
//# sourceMappingURL=enrollment.service.js.map