export type HttpErrorResponse = {
  message: string;
  refCode: string;
  type: string;
  statusCode: string;
  timestamp: string;
  infoURL: string;
};

export type CreatedResponse = {
  id: string;
  createdAt: string;
};

/**
 * Interface of the simple literal object with any string keys.
 */
export interface ObjectLiteral {
    [key: string]: any;
}