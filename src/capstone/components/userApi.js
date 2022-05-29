import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default class UserApi {
  static getAllUsers() {
    return axios.get("http://localhost:3001/users");
  }

  static saveUser(user) {
    if (user.email.length < 1) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("Email name must be at least 1 character.");
        }, 1000);
      });
    }

    let uid = uuidv4();
    let num = uid.match(/\d/g);
    num = num.join("");
    user.id = num;
    return axios.post("http://localhost:3001/users", user);
  }

  static deleteUser(id) {
    return axios.delete("http://localhost:3001/users/" + id);
  }
}
