import React, { useEffect, useState } from "react";
import {
  getContestList,
  getContestProblemList,
} from "../../services/user-service/user-service";
import { Container, Table, List, Button, Row, Col } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCurrentUserDetail } from "../../services/auth/auth";
import {
  deleteContestUtil,
  deleteProblem,
} from "../../services/admin/admin-service";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
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
  const convertDate = (date) => {
    if (date == null) return "";
    const temp = date;
    date = date.replace("T", " ");
    return date.slice(0, -13);
  };
  const deleteContest = () => {
    deleteContestUtil(contestId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const removeProblem = (event, index) => {
    console.log(contestData?.listOfProblem[index]);
    deleteProblem(contestId, contestData?.listOfProblem[index])
      .then((response) => {
        console.log(response);
        toast.success(response.message);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <h2>
              Contest Id - {contestId}
              <br />
              Start Time - {convertDate(contestData?.startTime)}
              <br />
              End Time - {convertDate(contestData?.endTime)}
            </h2>

            <Container>
              <List>
                {contestData?.listOfProblem?.map((element, index) => {
                  return (
                    <>
                      <li>
                        <Link to={element}>{element}</Link>
                        {getCurrentUserDetail() == "admin" && (
                          <CancelIcon
                            onClick={(e) => {
                              removeProblem(e, index);
                            }}
                          />
                        )}
                      </li>
                    </>
                  );
                })}
              </List>
            </Container>
            {getCurrentUserDetail() == "admin" && (
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SeeContest;
