import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Card, Input, Button } from "reactstrap";
import { submitCode } from "../../services/user-service/user-service";
import { getProblemStatementFromBackend } from "../../services/user-service/user-service";
import Problem from "./Problem";
import { Container } from "reactstrap";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getCurrentUserDetail } from "../../services/auth/auth";

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
        {/* <div className="Container" dangerouslySetInnerHTML={{__html: problemStatement
        }}></div> */}
        <MarkdownPreview
          source={problemStatement}
          rehypeRewrite={(node, index, parent) => {
            if (
              node.tagName === "a" &&
              parent &&
              /^h(1|2|3|4|5|6)/.test(parent.tagName)
            ) {
              parent.children = parent.children.slice(1);
            }
          }}
          wrapperElement={{
            "data-color-mode": "light",
          }}
        />
        <Button className="mt-2" onClick={handleSubmitButtonClick} color="success" block>Submit Code</Button>
        {getCurrentUserDetail() == "admin" && (
          <>
            <Button className="mt-2" color="primary" onClick={() =>{
              navigate('/admin/'+contestId+"/"+problemId+"/addProblemFiles");
            }} block>Edit Problem</Button>
          </>
        )}
      </Container>
    </>
  );
};
export default SeeProblem;
