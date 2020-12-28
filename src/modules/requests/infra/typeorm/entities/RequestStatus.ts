import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('request_status')
class RequestStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  sequency: number;
}

export default RequestStatus;
