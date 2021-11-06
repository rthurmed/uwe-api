import { IsEnum, IsIn, IsInt, IsOptional, IsString } from "class-validator";
import { DiagramType } from "../entities/diagram-type.enum";

export class UpdateDiagramDTO {
  @IsString()
  name: string;

  @IsIn([])
  @IsOptional()
  @IsEnum(DiagramType)
  type: DiagramType;
}
