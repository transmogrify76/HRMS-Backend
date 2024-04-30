import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";
import { Employee } from "../employee/employee.entity";
export class PayrollDto {
 /*


"basicSalary":5667,
"HRA":8987,
"CityAllowance":789,
"Con_Allowance":980,
"Other":987,
"Total_Earnings":87,
"employee":1



*/
  @IsNumber()
  @IsNotEmpty()
  basicSalary: number;

  @IsNumber()
  @IsNotEmpty()
  HRA: number;
 
  @IsNumber()
  @IsNotEmpty()
  CityAllowance: number;

  @IsNumber()
  @IsNotEmpty()
  Con_Allowance: number;

  @IsNumber()
  @IsNotEmpty()
  Other: number;

  @IsNumber()
  @IsNotEmpty()
  Total_Earnings: number;

  @IsNumber()
  @IsOptional()
  employee: Employee;

}