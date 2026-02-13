import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsNumber()
  salary: number;
}
