// 本番環境用のURL
// 動作確認のため、ハードコーディングしている。
// TODO: 開発環境用と本番環境用で分ける必要がある
// TODO: エフェメラルなIPなので、都度変える前提
export const BASE_URI = "http://34.146.197.140:30090";

export enum ResponseStatusCode {
  Success = 200,
  Fail = 500,
}
