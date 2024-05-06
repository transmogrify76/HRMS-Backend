
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length } from "class-validator";
import { Employee } from "../employee/employee.entity";
import { IsNull } from "typeorm";
export class PayrollDto {
 /*


"basicSalary":5667,
"HRA":8987,
"CityAllowance":789,
"Con_Allowance":980,
"Other":987,
"Total_Earnings":87,
"Provident_Fund":647,
"Professional_Tax":987,
"ESI_Mediclaim":789,
"deduction":234,
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

  
  @IsOptional()
  @IsNumber()
  Provident_Fund: number;

  @IsNumber()
  Professional_Tax: number;

  @IsOptional()
  @IsNumber()
  ESI_Mediclaim: number;

  @IsNumber()
  @IsNotEmpty()
  deduction: number;
  

}