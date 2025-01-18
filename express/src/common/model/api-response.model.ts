export class ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  error?: string;

  constructor(status: number, message: string, data: T, error?: string) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T, message: string = "Success"): ApiResponse<T> {
    return new ApiResponse(200, message, data);
  }

  static error<T>(message: string, error?: string): ApiResponse<T> {
    return new ApiResponse(500, message, null as any, error);
  }
}
