import React, { useEffect, useState } from "react";

import { Container, Row, Col, Button, List, Table } from "reactstrap";
import { fetchLeaderBoard } from "../../services/user-service/user-service";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const LeaderBoard = () => {
  const { contestId } = useParams();

  const [leaderBoard, setLeaderBoard] = useState();
  const convertData = (data) => {
    var res = [];
    for(var i in data)
      res.push([i, data[i]]);
    return res
  }
  useEffect(() => {
    console.log("HI");
    fetchLeaderBoard(contestId)
      .then((response) => {
        if (!response.isSuccess) throw new Error(response.message);
        console.log(response);
        const data = convertData(response.leaderBoard);
        console.log(response.leaderBoard);
        toast.success(response.message);
        console.log(data);
        setLeaderBoard(data);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  }, []);
  const handleClick = () => {
    fetchLeaderBoard(contestId)
      .then((response) => {
        if (!response.isSuccess) throw new Error(response.message);
        const data = convertData(response.leaderBoard);
        console.log(response.leaderBoard);
        toast.success(response.message);
        console.log(data);
        setLeaderBoard(data);
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };
  return (
    <>
       <Container>
        <Table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>User Id</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard?.map((element, index) => {
              return (
                <>
                  <tr>
                    <th>{index + 1}</th>
                    <th>{element[0]}</th>
                    <th>{element[1]}</th>
                  </tr>

                </>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Button block onClick={handleClick}>
              Refresh
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default LeaderBoard;
