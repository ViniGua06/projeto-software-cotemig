import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ChurchAccount {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  church_id: number;

  @Column({ nullable: false })
  account_id: string;
}
