import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'The refresh token previously issued to the user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0IiwgImVtYWlsIjoiZXhhbXBsZUBtYWlsLmNvbSJ9.DQZr3Fz8k8bK2QbM0sZzvXKf1mY',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
