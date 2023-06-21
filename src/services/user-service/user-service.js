import { myAxios } from "../base";

myAxios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('data'))?.jwtToken}`;

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

export const getEditorialFromBackend = (contestId, problemId) => {
    return myAxios
        .get("/compete/"+contestId+"/"+problemId+"/editorial")
        .then((response) => response.data);
}
export const getContestList = () => {
    
    console.log();
    return myAxios
    .get("/compete/")
    .then((response) => response.data);
}

export const getContestProblemList = (contestId) => {
    return myAxios
    .get("/compete/"+contestId+"/")
    .then((response) => response.data);
}

export const fetchLeaderBoard = (contestId) => {
    console.log("HERE");
    return myAxios
    .get("/compete/"+contestId+"/leaderBoard")
    .then((response) => response.data);
}
