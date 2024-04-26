import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length} from "class-validator";


/*

"firstName": "Shubham",
  "lastName": "Prasad",
  "email": "shub.prasad@gmail.com",
  "username": "Shub1234",
  "joiningDate" : "2024-01-29",
  "password": "Test@2024",
  "aadhaarNo":"869595965695",
  "mobileNo":"566565565",
  "panNo":"DNG6578694"

*/
export class RegisterDto {
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

  @IsString()
  joiningDate: string;

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
