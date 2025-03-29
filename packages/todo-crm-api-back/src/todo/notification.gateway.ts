import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Разрешить все источники
  },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationGateway.name);
  private activeUsers: Map<number, string> = new Map(); // Сопоставление userId и socketId
  private readNotifications: Map<number, Set<string>> = new Map(); // Прочитанные уведомления

  handleConnection(client: Socket) {
    this.logger.log(`Клиент подключен: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = [...this.activeUsers.entries()].find(
      ([, socketId]) => socketId === client.id,
    )?.[0];

    if (userId) {
      this.activeUsers.delete(userId);
      this.logger.log(`Пользователь ${userId} отключен`);
    }

    this.logger.log(`Клиент отключен: ${client.id}`);
  }

  @SubscribeMessage('register')
  handleRegister(client: Socket, userId: number) {
    this.activeUsers.set(userId, client.id);
    this.logger.log(
      `Пользователь ${userId} зарегистрирован с Socket ID ${client.id}`,
    );
  }

  sendNotification(
    userId: number,
    task: { id: string; title: string; endDate: Date },
  ) {
    const clientId = this.activeUsers.get(userId);

    // Проверяем, было ли уведомление уже прочитано
    const readNotifications = this.readNotifications.get(userId) || new Set();
    if (readNotifications.has(task.id)) {
      this.logger.log(
        `Уведомление ${task.id} уже прочитано пользователем ${userId}`,
      );
      return;
    }

    if (clientId) {
      this.server.to(clientId).emit('notification', {
        id: task.id, // Уникальный идентификатор уведомления
        message: `Напоминание: задача "${task.title}" подходит к концу (${task.endDate})`,
      });
      this.logger.log(`Уведомление отправлено пользователю ${userId}`);
    } else {
      this.logger.warn(
        `Не удалось отправить уведомление: пользователь ${userId} не в сети`,
      );
    }
  }

  @SubscribeMessage('markAsRead')
  handleMarkAsRead(
    client: Socket,
    payload: { userId: number; notificationId: string },
  ) {
    const { userId, notificationId } = payload;

    // Получаем набор прочитанных уведомлений для пользователя
    const readNotifications = this.readNotifications.get(userId) || new Set();

    // Добавляем уведомление в набор прочитанных
    readNotifications.add(notificationId);
    this.readNotifications.set(userId, readNotifications);

    this.logger.log(
      `Уведомление ${notificationId} помечено как прочитанное для пользователя ${userId}`,
    );
  }

  @SubscribeMessage('clearReadNotifications')
  handleClearReadNotifications(client: Socket, userId: number) {
    this.readNotifications.delete(userId);
    this.logger.log(
      `Прочитанные уведомления очищены для пользователя ${userId}`,
    );
  }
}
