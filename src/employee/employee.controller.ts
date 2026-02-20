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
  Query,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Employees')
@ApiBearerAuth() 
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // ================= CREATE =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() body: CreateEmployeeDto) {
    return this.employeeService.create(body);
  }

  // ================= GET ALL =================
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('department') department?: string,
    @Query('name') name?: string,
    @Query('minSalary') minSalary?: number,
    @Query('sort') sort?: string,
    @Query('order') order?: 'ASC' | 'DESC',
  ) {
    return this.employeeService.findAll(
      page,
      limit,
      department,
      name,
      minSalary,
      sort,
      order,
    );
  }

  // ================= EXPORT =================
  @Get('excel')
  downloadExcel(@Res() res: Response) {
    return this.employeeService.downloadExcel(res);
  }

  @Get('pdf')
  downloadPDF(@Res() res: Response) {
    return this.employeeService.downloadPDF(res);
  }

  @Get('ppt')
  downloadPPT(@Res() res: Response) {
    return this.employeeService.downloadPPT(res);
  }

  // ================= GET ONE =================
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.findOne(id);
  }

  // ================= UPDATE =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, body);
  }

  // ================= DELETE =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.remove(id);
  }

  // ================= RESTORE =================
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.restore(id);
  }
}