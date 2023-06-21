import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { submitCode } from "../../services/user-service/user-service";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { getCurrentUserDetail } from "../../services/auth/auth";
import { toast } from "react-toastify";

const SubmitProblem = () => {
  const { contestId, problemId } = useParams();
  const [srcCode, setSrcCode] = useState(null);
  const [language, setLanguage] = useState();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [result, setResult] = useState();
  const handleUpload = (event) => {
    setSrcCode(event.target.files[0]);
  };
  const handleChange = (event) => {
    setLanguage(event.target.value);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("sourceCode", srcCode);
    formData.append("userId", getCurrentUserDetail());
    formData.append("contestId", contestId);
    formData.append("problemId", problemId);
    formData.append("language", language);
    formData.append('timeStamp', new Date().getTime());
    console.log(new Date().getTime());
    submitCode(formData, contestId, problemId)
      .then((response) => {
        console.log(response);
        setHasSubmitted(true);
        setResult(response.details);
        if(response.isSuccess == null || response.isSuccess != true)
          throw new Error(response.details);
        toast.success(response.details);
        console.log(result);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error.message);
      });
  };
  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader className="text-center">
                <h3>Submit Code</h3>
              </CardHeader>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="language">Select</Label>
                    <Input id="language" name="language" type="select" onChange={handleChange}>
                      <option>?</option>
                      <option>cpp</option>
                      <option>java</option>
                      <option>python</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="srcCode">File</Label>
                    <Input id="srcCode" name="srcCode" type="file" onChange={handleUpload}/>
                    <FormText >
                      *Your code should read the data from file (whose path will be passed as first argument) and print into file (whose path will be passed as second argument). 
                      For  more please  refer <Link to="/faq">here</Link>
                    </FormText>
                  </FormGroup>
                  <Button onClick={handleSubmit} color="primary">Submit</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {
        hasSubmitted &&
          <h1>{result}</h1> 
      }
    </>
  );
};
export default SubmitProblem;
