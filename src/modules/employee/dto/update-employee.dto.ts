import { PartialType } from "@nestjs/mapped-types";
import { CreateEmployeeDto } from "./create-employee.dto";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsOptional} from "class-validator";

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {

    @IsString()
    @IsOptional()
    joiningDate: string;
  
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

    @IsString()
    @IsOptional()
    Education_qualification: string;
  
  
    @IsString()
    @IsOptional()
    dept: string;
  
  
    @IsString()
    @IsOptional()
    post: string;
  
    @IsString()
    @IsOptional()
    p_email: string;
     
  
    @IsString()
    @IsOptional()
    lap_no: string;
 }
