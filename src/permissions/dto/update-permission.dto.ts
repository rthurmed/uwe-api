import { IsEnum } from "class-validator";
import { AccessLevel } from "../entities/access-level.enum";

export class UpdatePermissionDto {
  @IsEnum(AccessLevel)
  level: number;
}
