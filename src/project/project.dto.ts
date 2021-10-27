import { IsString } from "class-validator";

export class CreateProjectDTO {
  @IsString()
  name: string
}

export class UpdateProjectDTO {
  @IsString()
  name: string
}
