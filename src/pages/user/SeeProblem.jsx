import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from 'react-markdown';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { submitCode } from "../../services/admin/user-service";
import { getProblemStatementFromBackend } from "../../services/admin/user-service";
import Problem from "./Problem";
const SeeProblem = () => {
  const { contestId, problemId } = useParams();
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
    fetchProblemStatement()
  }, []);
  return (
    <>
      <pre>{problemStatement}</pre>
    </>
  );
};
export default SeeProblem;
