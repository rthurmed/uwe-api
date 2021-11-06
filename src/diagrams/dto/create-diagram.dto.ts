import { IsEnum, IsInt, IsString } from "class-validator";
import { DiagramType } from "../entities/diagram-type.enum";

export class CreateDiagramDTO {
  @IsString()
  name: string;

  @IsEnum(DiagramType)
  type: DiagramType;

  @IsInt()
  projectId: number;
}
