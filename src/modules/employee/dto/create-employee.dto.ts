import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Length } from "class-validator";
import { Role } from "../role/role.entity";

/*
const payload ={
  "firstName": "Shubham",
  "lastName": "Prasad",
  "email": "shub.prasad@gmail.com",
  "username": "Shub1234",
  "joiningDate" : "2024-01-29",
  "password": "Test@2024",
  "role": 1
}
*/

/**
 * @author Supratim Majumder
 * @description request-body to create a employee. Demo payload is given above the class
 */
export class CreateEmployeeDto {
  @Length(2, 200)
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Length(2, 200)
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @Length(8, 60)
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  role: Role;
  
  @IsString()
  joiningDate:string;
 
  @IsString()
  @IsNotEmpty()
  aadhaarNo: string;

  @IsString()
  @IsNotEmpty()
  panNo: string;

  @IsString()
  @IsNotEmpty()
  mobileNo: string;

}
