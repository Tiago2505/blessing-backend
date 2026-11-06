import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRoles } from "../enums";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @Column('text', {
        nullable: true
    })
    phone: string;

    @Column('enum',{
        enum: UserRoles,
        default: UserRoles.USER
    })
    role: UserRoles

    @Column('boolean', {
        default: true
    })
    isActive: boolean;
}
