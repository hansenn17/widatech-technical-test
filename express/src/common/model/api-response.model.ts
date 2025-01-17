export class ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  errors?: string[];

  constructor(status: number, message: string, data: T, errors?: string[]) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  static success<T>(data: T, message: string = "Success"): ApiResponse<T> {
    return new ApiResponse(200, message, data);
  }

  static error<T>(message: string, errors?: string[]): ApiResponse<T> {
    return new ApiResponse(500, message, null as any, errors);
  }
}
