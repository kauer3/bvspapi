export default interface ICreateRequestHistoryFlowDTO {
  user_id: string;
  request_id: string;
  request_type_id: number;
  remember: Date;
}
