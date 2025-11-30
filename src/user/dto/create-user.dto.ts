import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsStrongPassword } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'naser@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Strong password for the user. Must include uppercase, lowercase, number, and special character',
    example: 'StrongP@ssw0rd!',
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description: 'The role of the user',
    enum: UserRole,
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
