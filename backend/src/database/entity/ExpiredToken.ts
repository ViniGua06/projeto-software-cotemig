import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("expiredtokens")
export class ExpiredTokens {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  token: string;
}
