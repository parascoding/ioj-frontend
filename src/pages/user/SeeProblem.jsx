import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import {
  Card,
  Input,
  Button
} from "reactstrap";
import { submitCode } from "../../services/user-service/user-service";
import { getProblemStatementFromBackend } from "../../services/user-service/user-service";
import Problem from "./Problem";
import { Container } from "reactstrap";
const SeeProblem = () => {
  const { contestId, problemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [problemStatement, setProblemStatement] = useState(null);
  const fetchProblemStatement = () => {
    getProblemStatementFromBackend(contestId, problemId)
      .then((response) => {
        console.log(response);
        setProblemStatement(response.markdown);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchProblemStatement();
  }, []);
  const handleSubmitButtonClick = () => {
    console.log(location);
    navigate(location.pathname + "/submit");
  };
  return (
    <>
      <Container>
        <div className="Container" dangerouslySetInnerHTML={{__html: problemStatement
        }}></div>
        <Button onClick={handleSubmitButtonClick} >Submit Code</Button>
      </Container>
    </>
  );
};
export default SeeProblem;
