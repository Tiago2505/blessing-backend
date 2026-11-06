import { IsNotEmpty, IsString, Matches } from "class-validator";
import { REGEX } from "../../common/regex";



export class ChangeMyPasswordDto{

    @IsNotEmpty()
    @IsString()
    currentPassword: string;

    @IsNotEmpty()
    @IsString()
    @Matches(REGEX.PASSWORD)
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

}