import React, { useEffect, useState } from "react";
import {
  getContestList,
  getContestProblemList,
} from "../../services/user-service/user-service";
import { Container, Table, List, Button, Row, Col } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCurrentUserDetail, getRole } from "../../services/auth/auth";
import {
  deleteContestUtil,
  deleteProblem,
} from "../../services/admin/admin-service";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
import { CloseButton } from "reactstrap";
const SeeContest = () => {
  const [contestData, setContestData] = useState();
  const { contestId } = useParams();
  const navigate = useNavigate();

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
  const deleteContest = () => {
    deleteContestUtil(contestId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const removeProblem = (index) => {
    console.log(contestData?.problemData);
    console.log(contestData?.problemData?.[index]);
    deleteProblem(contestId, contestData?.problemData[index]?.[0])
      .then((response) => {
        console.log(response);
        toast.success(response.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  const convertDate = (date) => {
    var t = new Date(date);
    var formatted = t.toLocaleDateString() + " " + t.toLocaleTimeString();
    return formatted;
  };
  const timeDifference = (date1, date2) => {
    var difference = date1 - date2;
    if (difference < 0) {
      return "Event Has Passed";
    }
    console.log(difference);
    var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference * 1000 * 60 * 60 * 24;

    var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference * 1000 * 60 * 60;

    var minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    var secondsDifference = Math.floor(difference / 1000);
    return (
      daysDifference +
      " Days " +
      hoursDifference.toString().padStart(2, "0") +
      ":" +
      minutesDifference.toString().padStart(2, "0") +
      ":" +
      secondsDifference.toString().padStart(2, "0")
    );
  };

  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <h4>
              Contest Id - {contestId}
              <br />
              Start Time - {convertDate(contestData?.startTime)}
              <br />
              End Time - {convertDate(contestData?.endTime)}
              <br />
              {new Date().getTime() < contestData?.startTime && (
                <>
                  Time Remaining -{" "}
                  {timeDifference(contestData?.startTime, new Date().getTime())}
                </>
              )}
              {new Date().getTime() > contestData?.endTime && (
                <>Contest is finished</>
              )}
              {new Date().getTime() >= contestData?.startTime &&
                new Date().getTime() <= contestData?.endTime && (
                  <>
                    Time Remaining -
                    {timeDifference(contestData?.endTime, new Date().getTime())}
                  </>
                )}
            </h4>

            <Container>
              <Table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Id</th>
                    <th>Difficulty</th>
                    <th>Solved By</th>
                    {getRole() == "ADMIN" && (
                      <>
                        <th>Remove</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {contestData?.problemData?.map((element, index) => {
                    return (
                      <>
                        <tr>
                          <th>{index + 1}</th>

                          <td>
                            <Link to={element[0]}>{element[0]}</Link>
                          </td>
                          <td>{element[1] == null ? "EASY" : element[1]}</td>
                          <td>{element[2]}</td>

                          {getRole() == "ADMIN" && (
                            <>
                              <td>
                                <CloseButton
                                onClick={() => {
                                  console.log("REMOVE");
                                  console.log(index);
                                  removeProblem(index);
                                }}
                                />
                              </td>
                            </>
                          )}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </Container>
            {getRole() == "ADMIN" && (
              <>
                <Button
                  onClick={() => {
                    navigate("/admin/" + contestId + "/createProblem");
                  }}
                  color="primary"
                  block
                >
                  Add New Problem
                </Button>
                <br />
                <Button onClick={deleteContest} color="danger" block>
                  Delete
                </Button>
              </>
            )}
            {
              <Button
                onClick={() => {
                  navigate("/user/compete/" + contestId + "/leaderBoard");
                }}
                color="info"
                block
                className="mt-3"
              >
                Check Leaderboard
              </Button>
            }
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SeeContest;
