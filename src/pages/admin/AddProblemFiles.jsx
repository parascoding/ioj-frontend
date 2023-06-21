import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import {  } from "tailwindcss";
import {
  Card,
  Form,
  Input,
  Checkbox,
  Button,
  Typography,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
} from "reactstrap";
import { addProblemFiles } from "../../services/admin/admin-service";
import { toast } from "react-toastify";

const AddProblemFiles = () => {
  const { contestId, problemId } = useParams();
  const [file, setFile] = useState({
    problemStatement: null,
    inputFile: null,
    outputFile: null,
    editorialFile: null,
    difficulty: "",
  });

  const [temp, setTemp] = useState(null);

  const tempChange = (event) => {
    setTemp(event.target.files[0]);
  };
  const handleUpload = (event, field) => {
    setFile({ ...file, [field]: event.target.files[0] });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("problemStatement", file.problemStatement);
    formData.append("inputFile", file.inputFile);
    formData.append("outputFile", file.outputFile);
    formData.append("editorialFile", file.editorialFile);

    addProblemFiles(formData, contestId, problemId)
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
            <Card>
              <CardHeader>Add Problem Files</CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="problemSatement">Problem Statement</Label>
                    <Input
                      type="file"
                      name="problemStatement"
                      onChange={(e) => {
                        handleUpload(e, "problemStatement");
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="inputFile">Input File</Label>
                    <Input
                      type="file"
                      name="inputFile"
                      onChange={(e) => {
                        handleUpload(e, "inputFile");
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="outputFile">Output File</Label>
                    <Input
                      type="file"
                      name="outputFile"
                      onChange={(e) => {
                        handleUpload(e, "outputFile");
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="editorialFile">Editorial File</Label>
                    <Input
                      type="file"
                      name="editorialFile"
                      onChange={(e) => {
                        handleUpload(e, "editorialFile");
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="difficulty">Difficulty</Label>
                    <Input
                      type="select"
                      name="difficulty"
                      onChange={(e) => {
                        handleUpload(e, "difficulty");
                      }}
                    >
                      <option>?</option>
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </Input>
                  </FormGroup>
                  <Button type="submit" color="success">
                    Submit
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AddProblemFiles;
