import { Type } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Employee } from "src/modules/employee/employee.entity";

/*
const payload = {
  "startDate": "04-11-2024",
  "endDate": "04-13-2024",
  "reason": "This is personal",
  "employee": 1,
  "duration":3
}
*/

/**
 * @author Supratim and Sagnik
 * @description request-body to create leave request. Demo payload is given above the class
 */
export class CreateLeaveDto {
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsNumber()
  @IsNotEmpty()
  empId: number;

  @IsEmail()
  @IsNotEmpty()
  employeeEmail: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
