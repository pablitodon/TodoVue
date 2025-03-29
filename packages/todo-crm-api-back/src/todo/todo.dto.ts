import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEnum,
  IsInt,
  Min,
} from 'class-validator';
import { TodoStatus } from './todo.entity';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Завершить проект', description: 'Название задачи' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Задача для завершения проекта',
    description: 'Описание задачи',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2025-01-11T10:00:00.000Z',
    description: 'Дата начала',
  })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({
    example: '2025-01-15T18:00:00.000Z',
    description: 'Дата окончания',
  })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    example: 'in-progress',
    description: 'Статус задачи',
    enum: ['in-progress', 'completed', 'failed'],
  })
  @IsString()
  @IsNotEmpty()
  status: TodoStatus;
}

export class FindTodosQueryDto {
  @IsOptional()
  @IsEnum(TodoStatus, {
    message: `status must be one of: ${Object.values(TodoStatus).join(', ')}`,
  })
  status?: TodoStatus;

  @IsOptional()
  @Type(() => Number) // Преобразует строку в число
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be at least 1' })
  page?: number;

  @IsOptional()
  @Type(() => Number) // Преобразует строку в число
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be at least 1' })
  limit?: number;
}

export class UpdateTodoDto {
  @ApiPropertyOptional({
    description: 'Название задачи',
    example: 'Новая задача',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Описание задачи',
    example: 'Описание задачи',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Дата начала',
    example: '2025-01-10T10:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Дата окончания',
    example: '2025-01-15T18:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Статус задачи',
    enum: TodoStatus,
    example: TodoStatus.IN_PROGRESS,
  })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
