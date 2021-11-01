import { IsEnum, IsInt, IsObject, IsString } from "class-validator";
import { Project } from "src/projects/entities/project.entity";
import { AccessLevel } from "../entities/access-level.enum";
import { Permission } from "../entities/permission.entity";

export class CreatePermissionDto {
  @IsEnum(AccessLevel)
  level: number;

  @IsString()
  userId: string;

  @IsInt()
  projectId: number;
}
