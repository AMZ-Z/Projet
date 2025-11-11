import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() photoUrl?: string;
}

export class UpdateClientDto {
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() photoUrl?: string;
}
