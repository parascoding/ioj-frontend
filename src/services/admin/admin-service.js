import { myAxios } from "../base";

myAxios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('data'))?.jwtToken}`;

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
export const deleteContestUtil = (contestId) => {
  return myAxios
    .post("/admin/deleteContest/" + contestId )
    .then((response) => response.data);
};

export const addProblem = (contestId, problemId) => {
  return myAxios
    .post("/admin/" + contestId + "/" + problemId + "/createProblem")
    .then((response) => response.data);
}

export const deleteProblem = (contestId, problemId) => {
  return myAxios
    .post("/admin/" + contestId + "/" + problemId + "/deleteProblem")
    .then((response) => response.data);
}