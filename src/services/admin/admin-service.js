import { myAxios } from "../base";

export const createContest = (contest) => {
  console.log(contest);
  return myAxios
    .post("/admin/createContest", contest)
    .then((response) => response.data);
};
export const addProblemFiles = (files, contestId, problemId) => {
  for (var [key, value] of files.entries()) {
    console.log(key, value);
  }
  return myAxios
    .post("/admin/" + contestId + "/" + problemId + "/addProblemFiles", files)
    .then((response) => response.data);
};
