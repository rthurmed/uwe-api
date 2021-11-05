import { IsBoolean, IsIn, IsOptional } from "class-validator";
import { AccessLevel } from "../entities/access-level.enum";

export class AcceptPermissionDTO {
  @IsIn([])
  @IsOptional()
  level: AccessLevel;

  @IsBoolean()
  accepted: boolean;
}