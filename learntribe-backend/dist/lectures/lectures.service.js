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
exports.LecturesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lecture_schema_1 = require("./schemas/lecture.schema");
let LecturesService = class LecturesService {
    lectureModel;
    constructor(lectureModel) {
        this.lectureModel = lectureModel;
    }
    async create(createLectureDto) {
        const createdLecture = new this.lectureModel({
            ...createLectureDto,
            startDate: new Date(createLectureDto.startDate),
            endDate: new Date(createLectureDto.endDate),
        });
        return createdLecture.save();
    }
    async findAll(queryParams) {
        const filter = {};
        if (queryParams?.domain) {
            filter.domain = { $regex: queryParams.domain, $options: 'i' };
        }
        if (queryParams?.title) {
            filter.title = { $regex: queryParams.title, $options: 'i' };
        }
        if (queryParams?.offer === true) {
            filter.offer = { $gt: 0 };
        }
        if (queryParams?.startDate && queryParams?.endDate) {
            filter.$and = [
                { startDate: { $lte: new Date(queryParams.endDate) } },
                { endDate: { $gte: new Date(queryParams.startDate) } },
            ];
        }
        const lectures = await this.lectureModel.find(filter).exec();
        const sortedLectures = lectures.sort((a, b) => {
            const aHasRomanian = a.languages?.some(lang => lang.toLowerCase().includes('romanian'));
            const bHasRomanian = b.languages?.some(lang => lang.toLowerCase().includes('romanian'));
            return aHasRomanian === bHasRomanian ? 0 : aHasRomanian ? -1 : 1;
        });
        return sortedLectures;
    }
    async findOne(id) {
        const lecture = await this.lectureModel.findById(id).exec();
        if (!lecture) {
            throw new common_1.NotFoundException(`Lecture with ID ${id} not found`);
        }
        return lecture;
    }
    async update(id, updateLectureDto) {
        const updateData = { ...updateLectureDto };
        if ('startDate' in updateLectureDto && updateLectureDto.startDate) {
            updateData.startDate = new Date(updateLectureDto.startDate);
        }
        if ('endDate' in updateLectureDto && updateLectureDto.endDate) {
            updateData.endDate = new Date(updateLectureDto.endDate);
        }
        const updatedLecture = await this.lectureModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
        if (!updatedLecture) {
            throw new common_1.NotFoundException(`Lecture with ID ${id} not found`);
        }
        return updatedLecture;
    }
    async remove(id) {
        const result = await this.lectureModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Lecture with ID ${id} not found`);
        }
    }
};
exports.LecturesService = LecturesService;
exports.LecturesService = LecturesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lecture_schema_1.Lecture.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LecturesService);
//# sourceMappingURL=lectures.service.js.map