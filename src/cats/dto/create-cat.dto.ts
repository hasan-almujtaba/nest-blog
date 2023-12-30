import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsIn(['Persian', 'Siamese', 'Maine Coon'])
  breed: string;
}
