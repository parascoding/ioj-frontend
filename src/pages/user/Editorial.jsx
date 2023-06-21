import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Card, Input, Button } from "reactstrap";
import { getEditorialFromBackend, submitCode } from "../../services/user-service/user-service";
import { getProblemStatementFromBackend } from "../../services/user-service/user-service";
import Problem from "./Problem";
import { Container } from "reactstrap";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getCurrentUserDetail, getRole } from "../../services/auth/auth";

const Editorial = () => {
  const { contestId, problemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [editorial, setEditorial] = useState();
  const fetchEditorial = () => {
    getEditorialFromBackend(contestId, problemId)
      .then((response) => {
        console.log(response);
        setEditorial(response.markDown);
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(editorial);
  };
  useEffect(() => {
    fetchEditorial();
  }, []);
  return (
    <>
      <Container>
        {/* <div className="Container" dangerouslySetInnerHTML={{__html: problemStatement
        }}></div> */}
        <MarkdownPreview
          source={editorial}
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
        
        {getRole() == "ADMIN" && (
          <>
            <Button className="mt-2" color="primary" onClick={() =>{
              navigate('/admin/'+contestId+"/"+problemId+"/addProblemFiles");
            }} block>Edit</Button>
          </>
        )}
      </Container>
    </>
  );
};
export default Editorial;
