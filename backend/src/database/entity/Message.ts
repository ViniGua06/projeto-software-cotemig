import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  text: string;

  @CreateDateColumn({ nullable: false })
  created_at?: Date;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  church_id: number;
}
