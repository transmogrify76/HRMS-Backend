
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employeedetails } from './details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Employeedetailsdto } from './dto/deatails.dto';
import { EmployeeService } from '../employee/employee.service';


@Injectable()
export class EmployeedetailService {
  constructor(
    @InjectRepository(Employeedetails)
    private readonly employeedetailsRepository: Repository<Employeedetails>,
    private readonly employeeService: EmployeeService
  ) { }


  async create(Employeedetailsdto: Employeedetailsdto) {

    const { employee } = await this.employeeService.findById(+Employeedetailsdto.employee);

    Employeedetailsdto.employee = employee;

    const newDetails = await this.employeedetailsRepository.create(Employeedetailsdto); 

    await this.employeedetailsRepository.save(newDetails); 
    if (!Array.isArray(employee.employeedetails)) {
        employee.employeedetails = [];
    }

    employee.employeedetails.push(newDetails);
    await employee.save();
    return {
      message: `Employee details uploaded for ${employee.username}`
    };
}


   async findAll() {
    const employeedetails = await this.employeedetailsRepository.find();

    return {
        employeedetails
    };
  }

  async findByEmpId(empId: number) {
    const { employee } = await this.employeeService.findById(empId);
    const empdetails = await this.employeedetailsRepository.find({
      where: {
        employee: {
          empId
        }
      }
    });

    if (!empdetails.length) {
      throw new NotFoundException(`no employeedetails for employee ${employee.username} (${employee.firstName} ${employee.lastName})`);
    } else {
      return {
        empdetails
      };
    }
  }
} 