import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardTitle,
  Form,
  Label,
  FormGroup,
  CardHeader,
  CardBody,
} from "reactstrap";
import { addProblem, createContest } from "../../services/admin/admin-service";
import { Container } from "reactstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const CreateProblem = () => {

  const [data, setData] = useState({
    problemId:""
  });
  const {contestId} = useParams();
  const handleChange = (event, field) => {
    setData({ ...data, [field]: event.target.value });
  };
  const submitForm = (event) => {
    event.preventDefault();
    addProblem(contestId, data.problemId)
      .then((response) => {
        console.log(response);
        toast.success(response.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
          <Card color="transparent" shadow={false}>
            <CardHeader className="text-center">
              <h3>Add Problem</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitForm}>
                <FormGroup>
                  <Label for="problemId">Problem Id</Label>
                  <Input
                    name="problemId"
                    label="Problem Id"
                    onChange={(e) => {
                      handleChange(e, "problemId");
                    }}  
                  />
                </FormGroup>
                <Button className="mt-6" color="success" onClick={submitForm}>
                  Add Problem
                </Button>
              </Form>
            </CardBody>
          </Card>
      </Container>
    </>
  );
};
export default CreateProblem;
