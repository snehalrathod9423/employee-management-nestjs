import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() body: CreateEmployeeDto) {
    return this.employeeService.create(body);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  // ✅ Excel FIRST
  @Get('excel')
  downloadExcel(@Res() res: Response) {
    return this.employeeService.downloadExcel(res);
  }

  // ✅ PDF
  @Get('pdf')
  downloadPDF(@Res() res: Response) {
    return this.employeeService.downloadPDF(res);
  }

  // ✅ PPT
  @Get('ppt')
  downloadPPT(@Res() res: Response) {
    return this.employeeService.downloadPPT(res);
  }

  // ✅ Dynamic routes LAST
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.remove(id);
  }
}
