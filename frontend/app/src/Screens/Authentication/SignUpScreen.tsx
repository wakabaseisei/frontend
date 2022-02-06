import {
  Button,
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { useState } from "react";

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
  })
);

export const SignUpScreen = () => {
  const classes = useStyles();
  // メールアドレス
  const [email, setEmail] = useState<string>("");

  // パスワード
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <p>こんにtは</p>
      <form onSubmit={() => console.log("ooo")}>
        <Grid container justifyContent="center">
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent>
                <div className={classes.email}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    type="email"
                    label="メールアドレス"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={classes.password}>
                  <TextField
                    fullWidth
                    id="password"
                    inputProps={{
                      "data-testid": "password",
                    }}
                    name="password"
                    type="password"
                    label="パスワード"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={classes.button}>
                  <Button variant="contained" color="primary" type="submit">
                    ログイン
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
