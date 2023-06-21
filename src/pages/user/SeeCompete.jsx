import React, { useEffect, useState } from "react";
import { getContestList } from "../../services/user-service/user-service";
import { Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment/moment";
const ContestPage = () => {
  const [contestData, setContestData] = useState();
  useEffect(() => {
    getContestList()
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
    var t = new Date(date);
    var formatted = t.toLocaleDateString()+" "+t.toLocaleTimeString();
    return formatted;
  };
  return (
    <>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Contest Id</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {contestData?.listOfContest?.map((element, index) => {
              return (
                <>
                  <tr>
                    <th>{index + 1}</th>
                    <td>
                        <Link to={element?.id}>
                        {element?.id}
                        </Link>
                    </td>
                    <td>{convertDate(element?.startTime)}</td>
                    <td>{convertDate(element?.endTime)}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ContestPage;
