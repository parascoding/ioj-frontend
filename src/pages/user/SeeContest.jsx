import React, { useEffect, useState } from "react";
import {
  getContestList,
  getContestProblemList,
} from "../../services/user-service/user-service";
import { Container, Table, List } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const SeeContest = () => {
  const [contestData, setContestData] = useState();
  const { contestId } = useParams();
  useEffect(() => {
    getContestProblemList(contestId)
      .then((response) => {
        console.log(response);
        setContestData(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("HI");
  }, []);
  const convertDate = (date) => {
    if (date == null) return "";
    const temp = date;
    date = date.replace("T", " ");
    return date.slice(0, -13);
  };
  return (
    <>
      <h2>
        Start Time - {convertDate(contestData?.startTime)}
        <br />
        End Time - {convertDate(contestData?.endTime)}
      </h2>

      <Container>
        <List>
          {contestData?.listOfProblem?.map((element, index) => {
            return (
              <>
                <Link to={element}>{element}</Link>
              </>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default SeeContest;
