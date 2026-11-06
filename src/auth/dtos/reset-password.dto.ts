import { IsNotEmpty, IsString, Matches } from "class-validator";
import { REGEX } from "../../common/regex";

export class ResetPasswordDto{
    @IsNotEmpty()
    @IsString()
    @Matches(REGEX.PASSWORD)
    newPassword: string;
    
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

    @IsNotEmpty()
    @IsString()
    token: string;
}