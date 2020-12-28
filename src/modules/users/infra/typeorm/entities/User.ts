import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import UserProfile from '@modules/users/infra/typeorm/entities/UserProfile';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  profile_id: number;

  @ManyToOne(() => UserProfile)
  @JoinColumn({ name: 'profile_id' })
  profile: UserProfile;

  @Column()
  name: string;

  @Column()
  company: string;

  @Column()
  city: string;

  @Column()
  city_state: string;

  @Column()
  country: string;

  @Column()
  email: string;

  @Column({ nullable: true, default: null })
  telephone: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
