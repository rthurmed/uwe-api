import { IsBoolean, IsEnum, IsInt, IsString } from 'class-validator';
import { EntityType } from '../entities/entity-type.enum';

export class CreateEntityDto {
  @IsEnum(EntityType)
  type: EntityType;

  @IsString()
  title: string;

  @IsInt()
  x: number;

  @IsInt()
  y: number;

  @IsInt()
  width: number;

  @IsInt()
  height: number;

  // TODO: Maybe change, this notation dont work nicely
  @IsBoolean()
  abstract = false;

  @IsInt()
  diagramId: number;

  @IsInt()
  originId: number;

  @IsInt()
  targetId: number;
}
