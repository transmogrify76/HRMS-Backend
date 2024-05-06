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

  
  @Column({ name: 'Provident Fund', nullable: true })
  Provident_Fund: number;

  @Column({ name: 'Professional Tax', nullable: true })
  Professional_Tax: number;

  @Column({ name: 'ESI_Mediclaim', nullable: true })
  ESI_Mediclaim: number;

  @Column({ name: 'Other deduction', nullable: true })
  otherdeduction: number;

  @Column({ name: 'Total_deduction', nullable: false })
  totaldeduction: number;

  @Column({ name: 'Transferred amount', nullable: false })
  transferred_amount: number;

  
  @ManyToOne(() => Employee, employee => employee.payrolls,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'emp_id' })
  employee: Employee;
}
