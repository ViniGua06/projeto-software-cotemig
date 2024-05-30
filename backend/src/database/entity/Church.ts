import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Church {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  code: string;
}
