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
"workingDays":28,
"month":"APRIL",
"Provident_Fund":3456,
"Professional_Tax":4353,
"ESI_Mediclaim":232,
"otherdeduction":456,
"totaldeduction":6569,
"transferred_amount":647,
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
  Provident_Fund: number;

  @IsOptional()
  @IsNumber()
  Professional_Tax: number;

  @IsOptional()
  @IsNumber()
  ESI_Mediclaim: number;

  @IsNumber()
  @IsNotEmpty()
  totaldeduction: number;

  @IsOptional()
  @IsNumber()
  otherdeduction: number;

  @IsNumber()
  @IsNotEmpty()
  transferred_amount: number;
}