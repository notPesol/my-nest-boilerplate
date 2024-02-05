export class TmpNatsDTO {
  subject: string;
  payload: {
    type: string;
    data: Record<string, any>;
  };
}
