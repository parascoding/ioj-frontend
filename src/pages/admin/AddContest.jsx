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
import { createContest } from "../../services/admin/admin-service";
import { Container } from "reactstrap";
import { toast } from "react-toastify";
import Datetime from 'react-datetime';
const CreateContest = () => {
  const [data, setData] = useState({
    contestId: "",
    startTime: "",
    endTime: ""
  });
  const handleChange = (event, field) => {
    setData({ ...data, [field]: event.target.value });
  };
  const handleDateTimeChange = (event, field)  => {
    var date = new Date(event._d);
    var epochTimeStamp = date.getTime();
    setData({...data, [field]: epochTimeStamp});
  }
  const submitForm = (event) => {
    event.preventDefault();
    createContest(data)
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
      <Container className="mt-5">
          <Card color="transparent" shadow={false}>
            <CardHeader className="text-center">
              <h3>Add Contest</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitForm}>
                <FormGroup>
                  <Label for="contestId">Contest Id</Label>
                  <Input
                    size="lg"
                    label="Contest Id"
                    onChange={(e) => {
                      handleChange(e, "contestId");
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="contestId">Start Time</Label>
                  <Datetime  
                    onChange={(e) => {
                      handleDateTimeChange(e, "startTime");
                    }}
                  /> 
                </FormGroup>
                <FormGroup>
                  <Label for="contestId">End Time</Label>
                  <Datetime  
                    onChange={(e) => {
                      handleDateTimeChange(e, "endTime");
                    }}
                  /> 
                </FormGroup>
                <Button className="mt-6" color="success" onClick={submitForm}>
                  Add Contest
                </Button>
              </Form>
            </CardBody>
          </Card>
      </Container>
    </>
  );
};
export default CreateContest;
