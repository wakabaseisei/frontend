import instance from "../Supports/Axios";
import { User } from "./Types/UserApiTypes";

/**
 * ユーザーを管理
 */
export default class UserData {
  static responseData: User[] | null = null;

  static async fetchUsers(): Promise<void> {
    const response = await instance.get("/users");
    console.log(response.data);
    if (!(response?.data.message === "success")) {
      console.log("ユーザー取得失敗");
      return;
    }

    const usersData: User[] = [...response.data.data];

    this.responseData = usersData;
  }

  static getUsersData() {
    console.log(this.responseData);
    return this.responseData ?? [];
  }
}
