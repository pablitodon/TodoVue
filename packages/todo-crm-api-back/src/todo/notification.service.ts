import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TodoService } from './todo.service';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly todoService: TodoService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  @Cron('0 */8 * * *') // раз в 8 часов
  async checkDeadlines() {
    this.logger.log('Проверка задач с приближающимся дедлайном...');

    const tasks = await this.todoService.findTasksWithUpcomingDeadline();

    for (const task of tasks) {
      const user = task.user;

      this.notificationGateway.sendNotification(user.id, {
        id: task.id.toString(),
        title: task.title,
        endDate: task.endDate,
      });
    }
  }
}
