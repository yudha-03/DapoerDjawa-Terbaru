import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@dapoerdjawa.com', description: 'User email address' })
  email: string;

  @ApiPropertyOptional({ example: 'Budi Santoso', description: 'User full name' })
  name?: string;
}

