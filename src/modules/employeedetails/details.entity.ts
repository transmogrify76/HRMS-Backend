import { BaseEntity,Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "../employee/employee.entity";

@Entity({ name: 'Employee_details' })
export class Employeedetails extends BaseEntity {    
  @PrimaryGeneratedColumn({ name: 'details_id' })
  detailsId:number;

  @Column({ name: 'bank_account_name' })
  bankAccountNAME: string;

  @Column({ name: 'bank_account_no' })
  bankAccountNo: string;

  @Column({ name: 'IFSC_code_no' })
  IFSCno: string;


  @ManyToOne(() => Employee, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'emp_id' })
  employee: Employee;



}