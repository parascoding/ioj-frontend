import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import {  } from "tailwindcss";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { submitCode } from "../../services/admin/user-service";

const SubmitProblem = () => {
  const {contestId, problemId} = useParams();
  const [srcCode, setSrcCode] = useState(null);
  const handleUpload = (event) => {
    setSrcCode(event.target.files[0]);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("sourceCode", srcCode);
    formData.append("userId", "parascoding");
    formData.append("contestId", contestId);
    formData.append("problemId", problemId);
    formData.append("language", "java");
    submitCode(formData, contestId, problemId)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="file"
          name="sourceCode"
          onChange={(e) => {
            handleUpload(e);
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};
export default SubmitProblem;
