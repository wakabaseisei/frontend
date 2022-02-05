import { Routes, Route } from "react-router-dom";
import { UserRegisterScreen } from "./Screens/Users/UserRegisterScreen";
import { UserScreen } from "./Screens/Users/UserScreen";
import { UserUpdateScreen } from "./Screens/Users/UserUpdateScreen";

/**
 * ルーティング設定のコンポーネント
 * @returns ルーティングの設定
 */
export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<UserScreen />} />
      <Route path="/userPost" element={<UserRegisterScreen />} />
      <Route path="/userUpdate/:userId" element={<UserUpdateScreen />} />
    </Routes>
  );
};
