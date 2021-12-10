import { IsEmail, IsEnum, IsInt } from 'class-validator';
import { AccessLevel } from '../entities/access-level.enum';

export class CreatePermissionDTO {
  @IsEnum(AccessLevel)
  level: number;

  @IsEmail()
  email: string;

  @IsInt()
  projectId: number;
}
