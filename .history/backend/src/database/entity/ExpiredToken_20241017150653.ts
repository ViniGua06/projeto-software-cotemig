import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ExpiredToken {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  token: string;
}
