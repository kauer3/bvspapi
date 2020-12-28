import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact_types')
class ContactType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default ContactType;
