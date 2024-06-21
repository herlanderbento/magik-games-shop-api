export interface IGeneratorToken {
  encrypt(payload: Record<string, unknown>): Promise<string>;
  decrypt<T>(payload: Record<string, any>): Promise<T>;
}
