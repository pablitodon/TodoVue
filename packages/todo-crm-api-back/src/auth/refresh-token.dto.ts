import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token для получения нового access токена',
  })
  refreshToken: string;
}
