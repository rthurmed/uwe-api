import { IsEnum, IsInt, IsString } from 'class-validator';
import { AccessLevel } from '../entities/access-level.enum';

export class CreatePermissionDTO {
  @IsEnum(AccessLevel)
  level: number;

  @IsString()
  userId: string;

  @IsInt()
  projectId: number;
}
