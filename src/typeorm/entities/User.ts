import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";
import { Posts } from "./Post";

@Entity({name: 'users'})
export class User {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    username: string;

    @Column()
    email: string;

    @Column()
    createAt: Date;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Posts, (posts) => posts.user)
    posts: Posts[]
    

}