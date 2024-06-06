import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards, Delete,ValidationPipe, BadRequestException } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AuthenticationGuard } from 'src/guards/auth/authentication.guard';
import { AuthorizationGuard } from 'src/guards/auth/authorization.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleType } from 'src/enums/role-type.enum';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService
  ) { }

  @Post()
  async create(
    @Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto
  ) {
    return await this.employeeService.create(createEmployeeDto);
  }

  @Post('register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto
  ) {
    return await this.employeeService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) loginDto: LoginDto
  ) {
    return await this.employeeService.login(loginDto);
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizationGuard)

  
  @Get()
  async findAll() {
    return await this.employeeService.findAll();
  }

  @Get('active')
  async findAllActive() {
    return await this.employeeService.findAllActive();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) empId: number
  ) {
    return await this.employeeService.findById(empId);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) empId: number,
    @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto
  ) {
    return await this.employeeService.updateById(empId, updateEmployeeDto);
  }

  @Post('deactivate')
async deactivateEmployee(
  @Body() payload: { isActive: boolean; empId: number }
) {
  const { isActive, empId } = payload;

  if (typeof empId !== 'number' || typeof isActive !== 'boolean') {
    throw new BadRequestException('Invalid request body');
  }

  // Call the service method to deactivate the employee
  return await this.employeeService.deactivateEmployee(empId, isActive);
}



  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.employeeService.delete(id);
  }
}
