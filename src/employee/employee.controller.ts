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
import { Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

 @UseGuards(JwtAuthGuard, RolesGuard)
 @Roles('admin')
 @Post()
 create(@Body() body: CreateEmployeeDto) {
    return this.employeeService.create(body);
  }
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


  // ✅ Excel 
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

  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.findOne(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, body);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
  return this.employeeService.restore(id);
 }

}
