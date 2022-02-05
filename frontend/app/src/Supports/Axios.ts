import axios from "axios";
import { BASE_URI } from "../Config/const";

const instance = axios.create({
  baseURL: BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
