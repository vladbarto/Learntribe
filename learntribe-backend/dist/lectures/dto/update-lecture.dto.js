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
exports.QueryLectureDto = exports.UpdateLectureDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_lecture_dto_1 = require("./create-lecture.dto");
class UpdateLectureDto extends (0, mapped_types_1.PartialType)(create_lecture_dto_1.CreateLectureDto) {
}
exports.UpdateLectureDto = UpdateLectureDto;
const class_validator_1 = require("class-validator");
class QueryLectureDto {
    domain;
    language;
    title;
}
exports.QueryLectureDto = QueryLectureDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryLectureDto.prototype, "domain", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryLectureDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryLectureDto.prototype, "title", void 0);
//# sourceMappingURL=update-lecture.dto.js.map