import {
  Button,
  CircularProgress,
  createStyles,
  Grid,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Data/Types/UserApiTypes";
import UserData from "../../Data/UserData";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@material-ui/core";
import instance from "../../Supports/Axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      alignItems: "center",
    },
    button: {
      marginTop: 30,
      marginBottom: 40,
      textAlign: "center",
    },
  })
);

export const UserScreen = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // データの読み込み状態
  const [isloading, setIsLoading] = useState<boolean>(true);

  const [users, setUsers] = useState<User[]>([]);

  let promiseAbort: (() => void) | null = null;

  const fetchUsers = async (force: boolean = false) => {
    try {
      const data = UserData.getUsersData();
      if (!data || data.length === 0 || force) {
        await UserData.fetchUsers();
      }
      setUsers(UserData.getUsersData());
    } catch (error) {
      console.log(error);
      console.error("ユーザー取得失敗");
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      const apiResponseResult = await instance.delete(`/users/${userId}`);
      console.log(apiResponseResult);
      await fetchUsers(true);
    } catch (error) {
      alert("削除に失敗しました");
      console.error("ユーザー削除失敗");
    }
  };

  useEffect(() => {
    type Resolver = (value: void) => void;
    Promise.race([
      fetchUsers(),
      new Promise((_: Resolver, reject) => {
        promiseAbort = () => reject("Aborted");
      }),
    ]).then(
      () => setIsLoading(false),
      () => console.warn("マウント時の処理中にエラーが発生")
    );
    return () => promiseAbort?.();
  }, []);
  return (
    <div className={classes.content}>
      {isloading ? (
        <CircularProgress />
      ) : (
        <>
          <h1>HOME</h1>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} md={8} lg={6} xl={6}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>性別</TableCell>
                      <TableCell>自己紹介</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {user.sex === 1 ? "男性" : "女性"}
                        </TableCell>
                        <TableCell>{user.introduction}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate(`/userUpdate/${user.id}`)}
                          >
                            編集
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={async () => await deleteUser(user.id)}
                          >
                            削除
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <div className={classes.button}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/userPost")}
            >
              ユーザー登録はこちら
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
