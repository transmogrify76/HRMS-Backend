import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "../employee/employee.entity";

@Entity({ name: 'payrolldetails' })
export class Payrolldetails extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'payroll_details_id' })
  payrolldetailsId: number;

  @Column({ name: 'basic_Salary', nullable: false })
  basicSalary: number;

  @Column({ name: 'HRA', nullable: false })
  HRA: number;

  @Column({ name: 'City_Allowance',  nullable: false })
  CityAllowance: number;

  @Column({ name: 'Con_Allowance', nullable: false })
  Con_Allowance: number;

  @Column({ name: 'Other', nullable: false })
  Other: number;


  @Column({ name: 'Total_Earnings', nullable: false })
  Total_Earnings: number;

  @Column({name:'month', nullable: false})
  month:string;

  @Column({name:'working_days', nullable: false})
  workingDays:number

  @ManyToOne(() => Employee, employee => employee.payrolls,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'emp_id' })
  employee: Employee;
}
