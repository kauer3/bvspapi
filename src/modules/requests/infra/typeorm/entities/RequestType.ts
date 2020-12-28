import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('request_types')
class RequestType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default RequestType;
