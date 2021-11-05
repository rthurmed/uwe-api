import { IsEnum, IsInt, IsString } from "class-validator";
import { DiagramType } from "../entities/diagram-type.enum";

export class UpdateDiagramDTO {
  @IsString()
  name: string;

  // FIXME: Allow only when creating, using update: false
  @IsEnum(DiagramType)
  type: DiagramType;
}
