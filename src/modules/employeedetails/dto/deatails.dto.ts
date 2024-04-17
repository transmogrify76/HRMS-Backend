import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Employee } from "src/modules/employee/employee.entity";

/*
payload{
    "adhaarCardNo":"869595965695",
    "bankAccountNo":"835983587894",
    "IFSCno":JJDUE838330,
    "employee":1
}
*/
export class Employeedetailsdto {

 @IsString()
 adhaarCardNo: string;

  @IsString()
  bankAccountNo: string;

  @IsString()
  IFSCno: string;

  @IsNumber()
  @IsNotEmpty()
  employee: Employee;


}
