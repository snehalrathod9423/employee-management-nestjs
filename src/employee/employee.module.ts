import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { AuthModule } from '../auth/auth.module'; 
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee]),
  AuthModule, 
  MailModule, 
],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
