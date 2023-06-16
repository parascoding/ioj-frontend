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
const CreateContest = () => {
  const [data, setData] = useState({
    contestId: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  });
  const convertData = (data) => {
    let ret = {};
    ret.startTime = data.startDate + " " + data.startTime + ":00";
    ret.endTime = data.endDate + " " + data.endTime + ":00";
    ret.contestId = data.contestId;
    return ret;
  };
  const handleChange = (event, field) => {
    setData({ ...data, [field]: event.target.value });
  };
  const submitForm = (event) => {
    event.preventDefault();
    const ret = convertData(data);
    createContest(ret)
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
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(e) => {
                      handleChange(e, "startDate");
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="time"
                    name="startTime"
                    onChange={(e) => {
                      handleChange(e, "startTime");
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(e) => {
                      handleChange(e, "endDate");
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="time"
                    name="endTime"
                    onChange={(e) => {
                      handleChange(e, "endTime");
                    }}
                  />
                </FormGroup>
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
