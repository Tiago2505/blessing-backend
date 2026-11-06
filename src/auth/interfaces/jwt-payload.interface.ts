import { UserRoles } from "../../users/enums";

export interface JwtPayload{
    id: number;
    name: string;
    email: string;
    role: UserRoles;
}