import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Employee } from "src/modules/employee/employee.entity";

/*
payload{
    "adhaarCardNo":"869595965695",
    "bankAccountNo":"835983587894",
    "IFSCno":"JJDUE838330",
    "panNo":"DNG6578694"
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


  @IsString()
  panNo: string;


  @IsNumber()
  @IsNotEmpty()
  employee: Employee;

}

