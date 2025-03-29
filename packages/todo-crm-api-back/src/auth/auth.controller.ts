import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  // ApiBearerAuth,
} from '@nestjs/swagger';
import { UserCreditsDto } from './auth.dto';
import { RefreshTokenDto } from './refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('update-token')
  @ApiOperation({ summary: 'Обновление токена доступа' })
  @ApiResponse({ status: 200, description: 'Новый access токен' })
  async updateToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string }> {
    const accessToken = await this.authService.updateToken(refreshTokenDto);
    return { accessToken };
  }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь зарегистрирован' })
  async register(@Body() registerDto: UserCreditsDto): Promise<void> {
    const { username, password } = registerDto;
    return this.authService.register(username, password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiResponse({ status: 200, description: 'Успешный вход', type: String })
  @ApiResponse({ status: 401, description: 'Неверные данные для входа' })
  async login(
    @Body() loginDto: UserCreditsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;
    return this.authService.login(username, password);
  }
}
