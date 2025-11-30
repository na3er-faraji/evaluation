import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'naser@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongP@ssw0rd!',
  })
  password: string;
}
