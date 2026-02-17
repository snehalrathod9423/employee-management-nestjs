import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import type { Response } from 'express';

import * as XLSX from 'xlsx';
import PDFDocument from 'pdfkit';
import PptxGenJS from 'pptxgenjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  // ✅ Create
  async create(createEmployeeDto: CreateEmployeeDto) {
  const hashedPassword = await bcrypt.hash(createEmployeeDto.password, 10);

  const employee = this.employeeRepository.create({
    ...createEmployeeDto,
    password: hashedPassword,
  });

  return await this.employeeRepository.save(employee);
}


  // ✅ Get All
  async findAll() {
    return await this.employeeRepository.find();
  }

  // ✅ Get One
  async findOne(id: number) {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  // ✅ Update
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  // ✅ Delete
  async remove(id: number) {
    await this.findOne(id);
    await this.employeeRepository.delete(id);
    return { message: 'Employee deleted successfully' };
  }

  // ✅ Excel Download
  async downloadExcel(res: Response) {
    const data = await this.employeeRepository.find();

    const sheet = XLSX.utils.json_to_sheet(data);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, 'Employees');

    const file = XLSX.write(book, {
      type: 'buffer',
      bookType: 'xlsx',
    });

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=employees.xlsx',
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    res.send(file);
  }

  // ✅ PDF Download
  async downloadPDF(res: Response) {
    const data = await this.employeeRepository.find();

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=employees.pdf',
    );

    doc.pipe(res);

    doc.fontSize(18).text('Employee List', { align: 'center' });
    doc.moveDown();

    data.forEach(emp => {
      doc.text(
        emp.id +
          ' - ' +
          emp.name +
          ' - ' +
          emp.email +
          ' - ' +
          emp.department +
          ' - ' +
          emp.salary,
      );
      doc.moveDown();
    });

    doc.end();
  }

  // ✅ PPT Download (Table Format)
  async downloadPPT(res: Response) {
  const data = await this.employeeRepository.find();

  const ppt = new PptxGenJS();

  const limitPerSlide = 10;   

  let slide;
  let rows: any[] = [];
  let count = 0;

  for (let i = 0; i < data.length; i++) {

    // If first row OR new slide needed
    if (count === 0) {
      slide = ppt.addSlide();

      slide.addText('Employee List', {
        x: 0.5,
        y: 0.3,
        fontSize: 20,
        bold: true,
      });

      rows = [];

      // Header row
      rows.push([
        { text: 'ID', options: { bold: true } },
        { text: 'Name', options: { bold: true } },
        { text: 'Email', options: { bold: true } },
        { text: 'Department', options: { bold: true } },
        { text: 'Salary', options: { bold: true } },
      ]);
    }

    const emp = data[i];

    rows.push([
      emp.id.toString(),
      emp.name,
      emp.email,
      emp.department,
      emp.salary.toString(),
    ]);

    count++;

    // If limit reached OR last record
    if (count === limitPerSlide || i === data.length - 1) {
      slide.addTable(rows, {
        x: 0.5,
        y: 1,
        w: 9,
      });

      count = 0;  // reset for next slide
    }
  }

  const buffer = await ppt.write({ outputType: 'nodebuffer' });

  res.setHeader(
    'Content-Disposition',
    'attachment; filename=employees.pptx',
  );
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  );

  res.send(buffer);
 }

}
