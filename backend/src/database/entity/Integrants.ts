import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Church } from "./Church";

@Entity()
export class User_Church {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: true })
  church: number;

  @Column({ nullable: false })
  role: string;
}
