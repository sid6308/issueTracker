import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default class IssueApi {
  static getAllIssues() {
    return axios.get("http://localhost:3001/issues");
  }

  static saveIssue(issue) {
    if (issue.desc.length < 1) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("User name must be at least 1 character.");
        }, 1000);
      });
    }

    let uid = uuidv4();
    let num = uid.match(/\d/g);
    num = num.join("");
    issue.id = num;
    issue.viewcount = 0;
    return axios.post("http://localhost:3001/issues", issue);
  }

  static deleteIssue(id) {
    return axios.delete("http://localhost:3001/issues/" + id);
  }
}
