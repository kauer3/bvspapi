import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Request from '@modules/requests/infra/typeorm/entities/Request';
import User from '@modules/users/infra/typeorm/entities/User';
import RequestType from '@modules/requests/infra/typeorm/entities/RequestType';
import RequestStatus from '@modules/requests/infra/typeorm/entities/RequestStatus';

@Entity('followup_requests')
class FollowUpRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  request_id: string;

  @ManyToOne(() => Request)
  @JoinColumn({ name: 'request_id' })
  request: Request;

  @Column()
  request_type_id: number;

  @ManyToOne(() => RequestType)
  @JoinColumn({ name: 'request_id' })
  request_type: RequestType;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  request_status_id: number;

  @ManyToOne(() => RequestStatus)
  @JoinColumn({ name: 'request_status_id' })
  request_status: RequestStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FollowUpRequest;
