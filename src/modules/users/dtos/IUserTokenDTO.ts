export default interface IUserTokenDTO {
  id: string;
  token: string;
  user_id: string;
  valid: boolean;
  created_at: Date;
}
