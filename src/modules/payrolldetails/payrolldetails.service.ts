
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payrolldetails } from './payrolldetails.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PayrolldetailsDto } from './payrolldetails.dto';
import { EmployeeService } from '../employee/employee.service';


@Injectable()
export class PayrolldetailsdetailService {
  constructor(
    @InjectRepository(Payrolldetails)
    private readonly PayrolldetailsRepository: Repository<Payrolldetails>,
    private readonly employeeService: EmployeeService
  ) { }


  async create(PayrolldetailsDto: PayrolldetailsDto) {

    const { employee } = await this.employeeService.findById(+PayrolldetailsDto.employee);

    PayrolldetailsDto.employee = employee;

    const newDetails = await this.PayrolldetailsRepository.create(PayrolldetailsDto); 

    await this.PayrolldetailsRepository.save(newDetails); 
    if (!Array.isArray(employee.employeedetails)) {
        employee.employeedetails = [];
    }

    employee.payrolldetails.push(newDetails);
    await employee.save();
    return {
      message: `Payroll details successfully uploaded for ${employee.username}`
    };
}


   async findAll() {
    const payrolldetails = await this.PayrolldetailsRepository.find();

    return {
        payrolldetails
    };
  }

  async findByEmpId(empId: number) {
    const { employee } = await this.employeeService.findById(empId);
    const payrolldetails = await this.PayrolldetailsRepository.find({
      where: {
        employee: {
          empId
        }
      }
    });

    if (!payrolldetails.length) {
      throw new NotFoundException(`No payrolldetails for employee ${employee.username} (${employee.firstName} ${employee.lastName})`);
    } else {
      return {
        payrolldetails
      };
    }
  }
}