import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length,IsOptional } from "class-validator";
import { Employee } from "../employee/employee.entity";
export class PayrolldetailsDto {
    
 /*


"basicSalary":5667,
"HRA":8987,
"CityAllowance":789,
"Con_Allowance":980,
"Other":987,
"Total_Earnings":87,
"employee":1,
"workingDays":28,
"month":"APRIL"



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
  @IsNotEmpty()
  employee: Employee;

  @IsNumber()
  @IsNotEmpty()
  workingDays: number;

  @IsString()
  @IsNotEmpty()
  month: string;

  @IsOptional()
  @IsNumber()
  providentFund: number;

  @IsOptional()
  @IsNumber()
  professionalTax: number;

  @IsOptional()
  @IsNumber()
  ESI_Mediclaim: number;
}