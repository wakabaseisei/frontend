import {
  Button,
  createStyles,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Theme,
} from "@material-ui/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserData from "../../Data/UserData";
import instance from "../../Supports/Axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: 100,
    },
    email: {
      marginTop: 40,
    },
    password: {
      marginTop: 30,
    },
    button: {
      marginTop: 30,
      marginBottom: 40,
      textAlign: "center",
    },
    form: {
      textAlign: "center",
    },
  })
);

export const UserUpdateScreen = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const { userId } = useParams<"userId">();

  // メールアドレス
  const [sex, setSex] = useState<number>(1);

  // パスワード
  const [introduction, setIntroduction] = useState<string>("");

  const Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await instance
      .put(`/users/${userId}`, {
        sex: sex,
        introduction: introduction,
      })
      .then(async (res) => {
        console.log(res.data);
        await UserData.fetchUsers();
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8} lg={6} xl={6}>
          <form onSubmit={Submit}>
            <div className={classes.form}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        自己紹介
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          multiline
                          fullWidth
                          id="introduction"
                          name="introduction"
                          label="自己紹介"
                          variant="outlined"
                          required
                          margin="normal"
                          onChange={(e) => setIntroduction(e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        性別
                      </TableCell>
                      <TableCell align="right">
                        <FormControl>
                          <RadioGroup
                            onChange={(e) =>
                              setSex(e.target.value === "man" ? 1 : 2)
                            }
                            defaultValue="man"
                          >
                            <FormControlLabel
                              value="man"
                              label="男性"
                              control={<Radio color="primary" />}
                            />
                            <FormControlLabel
                              value="woman"
                              label="女性"
                              control={<Radio color="primary" />}
                            />
                          </RadioGroup>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={classes.button}>
              <Button variant="contained" color="primary" type="submit">
                更新
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
