export default interface ICreateUserDTO {
  profile_id: number;
  name: string;
  telephone?: string;
  email: string;
  city: string;
  city_state: string;
  country: string;
  company: string;
  password: string;
}
