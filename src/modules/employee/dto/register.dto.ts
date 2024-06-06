import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length} from "class-validator";


/*

"firstName": "Shubham",
  "lastName": "Prasad",
  "email": "shub.prasad@gmail.com",
  "username": "Shub1234",
  "joiningDate" : "2024-01-29",
  "password": "Test@2024",
  "aadhaarNo":"869595965695",
  "mobileNo":"566565565",
  "panNo":"DNG6578694",
  "emergencyNo":"6777888890",
   "empIDNO":"23422",
   "Permanent_Address":"12F k c pal kol-700076",
   "Present_Address":"12F k c pal kol-700076",
   "bloodGroup":"b+",
   "confirmationData":"2025-09-25"

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

  @IsString()
  @IsOptional()
  confirmationData: string;

  @IsString()
  @IsNotEmpty()
  bloodGroup: string;

  @IsString()
  @IsNotEmpty()
  Present_Address: string;

  @IsString()
  @IsNotEmpty()
  Permanent_Address: string;

  @IsString()
  @IsNotEmpty()
  empIDNO: string;

  @IsString()
  @IsNotEmpty()
  emergencyNo: string;


  @IsString()
  @IsNotEmpty()
  Education_qualification: string;


  @IsString()
  @IsNotEmpty()
  dept: string;


  @IsString()
  @IsNotEmpty()
  post: string;

  @IsString()
  @IsNotEmpty()
  p_email: string;


  @IsString()
  @IsOptional()
  lap_no: string;
}
