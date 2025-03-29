import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findTasksWithUpcomingDeadline(): Promise<Todo[]> {
    const now = new Date();
    const deadlineThreshold = new Date();
    deadlineThreshold.setHours(now.getHours() + 1);

    return this.todoRepository.find({
      where: {
        endDate: Between(now, deadlineThreshold),
      },
      relations: ['user'],
    });
  }

  async create(todo: Partial<Todo>, user: User): Promise<Todo> {
    const newTodo = this.todoRepository.create({ ...todo, user });
    return this.todoRepository.save(newTodo);
  }

  async update(
    id: number,
    updateData: Partial<Todo>,
    user: User,
  ): Promise<Todo> {
    await this.todoRepository.update({ id, user }, updateData);
    return this.todoRepository.findOne({ where: { id, user } });
  }

  async remove(id: number, user: User): Promise<void> {
    await this.todoRepository.delete({ id, user });
  }

  async findAll(
    user: User,
    status?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Todo[]; total: number }> {
    const query = this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('todo.status = :status', { status });
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }

  async findOne(id: number, user: User): Promise<Todo> {
    return this.todoRepository.findOne({
      where: { id, user },
    });
  }
}
