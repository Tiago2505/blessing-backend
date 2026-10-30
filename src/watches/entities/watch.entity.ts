import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "../enums";
import type{ WatchImage } from "../interfaces";

@Entity()
export class Watch {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;
    
    @Column('text')
    description: string;
    
    @Column()
    price: number;
    
    @Column('text')
    brand: string;

    @Column('enum', { enum: Gender })
    gender: Gender;

    @Column('jsonb',{
        default: []
    })
    images: WatchImage[];

    @Column('boolean', {
        default: true
    })
    isAvailable: boolean;
}

