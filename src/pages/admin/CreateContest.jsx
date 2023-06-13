import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { createContest } from "../../services/admin/admin-service";
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
    ret.startTime = data.startDate + " " + data.startTime+":00";
    ret.endTime = data.endDate + " " + data.endTime+":00";
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mx-[600px] mt-[100px]">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Add contest
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter contest details
          </Typography>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={submitForm}
          >
            <div className="mb-4 flex flex-col gap-6">
              <Input
                type="date"
                size="lg"
                label="Start Date"
                onChange={(e) => {
                  handleChange(e, "startDate");
                }}
              />
              <Input
                type="time"
                size="lg"
                label="Start Time"
                onChange={(e) => {
                  handleChange(e, "startTime");
                }}
              />
              <Input
                type="date"
                size="lg"
                label="End Date"
                onChange={(e) => {
                  handleChange(e, "endDate");
                }}
              />
              <Input
                type="time"
                size="lg"
                label="End Time"
                onChange={(e) => {
                  handleChange(e, "endTime");
                }}
              />
              <Input
                size="lg"
                label="Contest Id"
                onChange={(e) => {
                  handleChange(e, "contestId");
                }}
              />
            </div>
            <Button className="mt-6" fullWidth onClick={submitForm}>
              Add Contest
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};
export default CreateContest;
