import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTodoDto, FindTodosQueryDto, UpdateTodoDto } from './todo.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Создание новой задачи' })
  @ApiResponse({ status: 201, description: 'Задача создана', type: Todo })
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todoService.create(createTodoDto, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Получение списка задач' })
  @ApiResponse({ status: 200, description: 'Список задач', type: [Todo] })
  async findAll(
    @GetUser() user: User,
    @Query() query: FindTodosQueryDto,
  ): Promise<{ data: Todo[]; total: number }> {
    const { status, page = 1, limit = 10 } = query;
    return this.todoService.findAll(user, status, page, limit);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Получение задачи по ID' })
  @ApiResponse({ status: 200, description: 'Задача найдена', type: Todo })
  async findOne(@GetUser() user: User, @Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(Number(id), user);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Обновление задачи' })
  @ApiResponse({ status: 200, description: 'Задача обновлена', type: Todo })
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiResponse({ status: 200, description: 'Задача удалена' })
  async remove(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.todoService.remove(Number(id), user);
  }
}
