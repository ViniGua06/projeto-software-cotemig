import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ExpiredTokens {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  token: string;
}
