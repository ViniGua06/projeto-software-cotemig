import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Aware {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  notice_id: number;

  @Column({ nullable: false })
  user_id: number;

  
}
