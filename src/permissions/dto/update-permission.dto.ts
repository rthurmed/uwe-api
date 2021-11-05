import { IsEnum } from "class-validator";
import { AccessLevel } from "../entities/access-level.enum";

export class UpdatePermissionDTO {
  @IsEnum(AccessLevel)
  level: number;
}
