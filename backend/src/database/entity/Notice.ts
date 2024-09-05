import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  church_id: number;

  @Column({nullable: false})
  aware: number;
}
