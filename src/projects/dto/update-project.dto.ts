import { IsString } from "class-validator";

export class UpdateProjectDTO {
  @IsString()
  name: string
}
