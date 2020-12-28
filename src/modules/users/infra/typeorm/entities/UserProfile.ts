import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_profiles')
class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default UserProfile;
