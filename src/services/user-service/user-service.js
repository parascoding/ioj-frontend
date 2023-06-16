import { myAxios } from "../base";

export const submitCode = (sourceCode, contestId, problemId) => {
    for (var [key, value] of sourceCode.entries()) {
        console.log(key, value);
      }
    return myAxios
    .post("/compete/" + contestId + "/" + problemId + "/submit", sourceCode)
    .then((response) => response.data);
};

export const getProblemStatementFromBackend = (contestId, problemId) => {
    return myAxios
        .get("/compete/"+contestId+"/"+problemId+"/view")
        .then((response) => response.data);
}

export const getContestList = () => {
    return myAxios
    .get("/compete/")
    .then((response) => response.data);
}

export const getContestProblemList = (contestId) => {
    return myAxios
    .get("/compete/"+contestId+"/")
    .then((response) => response.data);
}

