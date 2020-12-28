import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import Request from '@modules/requests/infra/typeorm/entities/Request';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('history_requests')
class HistoryRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  request_id: string;

  @ManyToOne(() => Request)
  @JoinColumn({ name: 'request_id' })
  request: Request;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: Request;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}

export default HistoryRequest;
