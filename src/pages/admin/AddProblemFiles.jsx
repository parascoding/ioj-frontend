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
import { addProblemFiles } from "../../services/admin/admin-service";

const AddProblemFiles = () => {
  const {contestId, problemId} = useParams();
  const [file, setFile] = useState({
    problemStatement: null, 
    inputFile: null, 
    outputFile: null
  });

  const [temp, setTemp] = useState(null);

  const tempChange = (event) => {
    setTemp(event.target.files[0]);
  }
  const handleUpload = (event, field) => {
    setFile({...file, [field]: event.target.files[0]});
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("problemStatement", file.problemStatement);
    formData.append("inputFile", file.inputFile)
    formData.append("outputFile", file.outputFile)
    
    addProblemFiles(formData, contestId, problemId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input type="file" name="problemStatement" onChange={(e) => {handleUpload(e, "problemStatement")}} />
      <Input type="file" name="inputFile" onChange={(e) => {handleUpload(e, "inputFile")}} />
      <Input type="file" name="outputFile" onChange={(e) => {handleUpload(e, "outputFile")}} />
      <Button type="submit">Submit</Button>
    </form>
  );
};
export default AddProblemFiles;
