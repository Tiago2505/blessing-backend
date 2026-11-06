import { IsBoolean, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { REGEX } from "../../common/regex";
import { Type } from "class-transformer";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Matches(REGEX.EMAIL)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(REGEX.PASSWORD)
    password: string;

    @IsOptional()
    @IsString()
    @Matches(REGEX.PHONE)
    phone?: string;

    @IsOptional()
    @IsBoolean()
    @Type(()=>Boolean)
    isActive?: boolean;

}
