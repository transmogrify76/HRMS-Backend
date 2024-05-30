import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsString, IsOptional, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {

    @IsNumber()
    @IsNotEmpty()
    empId: number;

    @IsString()
    @IsOptional()
    joiningDate: string;

    @IsString()
    @IsOptional()
    relievingDate: string;

    @IsString()
    @IsOptional()
    aadhaarNo: string;

    @IsString()
    @IsOptional()
    panNo: string;

    @IsString()
    @IsOptional()
    mobileNo: string;

    @IsString()
    @IsOptional()
    confirmationData: string;

    @IsString()
    @IsOptional()
    bloodGroup: string;

    @IsString()
    @IsOptional()
    Present_Address: string;

    @IsString()
    @IsOptional()
    Permanent_Address: string;

    @IsString()
    @IsOptional()
    empIDNO: string;

    @IsString()
    @IsOptional()
    emergencyNo: string;

    @IsNumber()
    @IsOptional()
    leaveCount: number;

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;

}
