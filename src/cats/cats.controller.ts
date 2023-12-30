import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { CustomValidationPipe } from 'src/shared/custom-validation.pipe';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
    return `This action returns a #${id} cat`;
  }

  @Post()
  @UsePipes(new CustomValidationPipe())
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }
}
