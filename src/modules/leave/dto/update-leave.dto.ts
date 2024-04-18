import { PartialType } from "@nestjs/mapped-types";
import { CreateLeaveDto } from "./create-leave.dto";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Status } from "src/enums/status.enum";

export class UpdateLeaveDto extends PartialType(CreateLeaveDto) {
  @IsEnum(Status, { message: 'leaveStatus must be PENDING or APPROVED or REJECTED' })
  @IsNotEmpty()
  @IsOptional()
  leaveStatus: Status;

  @IsNumber()
  @IsOptional()
  empId: number;

  @IsEmail()
  @IsNotEmpty()
  employeeEmail: string;
}
