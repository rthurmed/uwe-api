import { IsNumber } from 'class-validator';

export class MoveDTO {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}
