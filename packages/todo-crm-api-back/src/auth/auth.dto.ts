import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UserCreditsDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'user123',
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
