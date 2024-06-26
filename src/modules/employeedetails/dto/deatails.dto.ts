import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Employee } from "src/modules/employee/employee.entity";

/*
payload{
    "adhaarCardNo":"869595965695",
    "bankAccountNo":"835983587894",
    "IFSCno":"JJDUE838330",
    "bankAccountName":"4444444444444444"
    "employee":1
}
*/
export class Employeedetailsdto {


  @IsString()
  bankAccountNo: string;

  @IsString()
  bankAccountName: string;

  @IsString()
  IFSCno: string;

  
  @IsNumber()
  @IsNotEmpty()
  employee: Employee;

}

