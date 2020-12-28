import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import RequestStatus from './RequestStatus';
import ContactType from './ContactType';

@Entity('requests')
class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  client_description: string;

  @Column()
  attendant_description: string;

  @Column()
  request_status_id: number;

  @ManyToOne(() => RequestStatus)
  @JoinColumn({ name: 'request_status_id' })
  request_status: RequestStatus;

  @Column()
  contact_type_id: number;

  @ManyToOne(() => ContactType)
  @JoinColumn({ name: 'contact_type_id' })
  contact_type: ContactType;

  @Column()
  contact: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Request;
