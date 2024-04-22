import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "../employee/employee.entity";

@Entity({ name: 'payrolls' })
export class Payroll extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'payroll_id' })
  payrollId: number;

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

  @OneToOne(() => Employee, employee => employee.payrolls,{ onDelete: 'CASCADE' })
  @JoinColumn({ name: 'emp_id' })
  employee: Employee;
}
