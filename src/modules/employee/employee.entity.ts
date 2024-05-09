import * as bcrypt from 'bcrypt';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from './role/role.entity';
import { Attendance } from '../attendance/attendance.entity';
import { Leave } from '../leave/leave.entity';
import { Payroll } from '../payroll/payroll.entity';
import { Employeedetails } from '../employeedetails/details.entity';
import { Payrolldetails } from '../payrolldetails/payrolldetails.entity';


@Entity({ name: 'employees' })
export class Employee extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'emp_id' })
  empId: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true, length: 255 }) // Example length
  email: string;

  @Column({ unique: true, length: 50 }) // Example length
  username: string;

  @Column({ length: 255 }) // Example length
  password: string;

  @Column({ name: 'joining_date',nullable: true })
  joiningDate: string;

  @Column({ name: 'confirmation_Date',nullable: true })
  confirmationData: string;

  @Column({ name: 'Blood_group',nullable: true })
  bloodGroup: string;

  @Column({ name: 'Present_Address',nullable: true })
  Present_Address: string;

  @Column({ name: 'Permanent_Address',nullable: true })
  Permanent_Address: string;

  @Column({ name: 'Emp_ID_NO',nullable: true })
  empIDNO: string;


  @Column({ name: 'Leave_count',nullable: true })
  leaveCount: number;

  @Column({ name: 'Emergency_no', length: 15 ,nullable: true}) // Example length
  emergencyNo: string;

  @ManyToOne(() => Role, role => role.employees)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Attendance, attendance => attendance.employee)
  attendances: Attendance[];

  @OneToMany(() => Leave, leave => leave.employee)
  leaves: Leave[];

  @OneToMany(() => Employeedetails, employeedetails => employeedetails.employee)
  employeedetails: Employeedetails[];

  @OneToOne(() => Payroll, payroll => payroll.employee)
  payrolls: Payroll[];


  @OneToMany(() => Payrolldetails, payrolldetails => payrolldetails.employee)
  payrolldetails: Payrolldetails[];


  @Column({ name: 'is_active', type: 'boolean', default: true, nullable: false })
  isActive: boolean;

  @Column({ name: 'aadhaar_no', length: 20 }) // Example length
  aadhaarNo: string;

  @Column({ name: 'pan_no', length: 20 }) // Example length
  panNo: string;

  @Column({ name: 'mobile_no', length: 15 }) // Example length
  mobileNo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async setHashedPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

