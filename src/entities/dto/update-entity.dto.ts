import { IsBoolean, IsInt, IsString } from 'class-validator';

export class UpdateEntityDto {
  @IsInt()
  id: number;

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

  // TODO: Maybe change notation
  @IsBoolean()
  abstract = false;

  @IsInt()
  originId: number;

  @IsInt()
  targetId: number;
}
