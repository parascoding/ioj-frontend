import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
    submitCode(formData, contestId, problemId)
      .then((response) => {
        console.log(response);
        toast.success(response.details);
        setHasSubmitted(true);
        setResult(response.details);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
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
                    <FormText>
                      This is some placeholder block-level help text for the
                      above input. It's a bit lighter and easily wraps to a new
                      line.
                    </FormText>
                  </FormGroup>
                  <Button onClick={handleSubmit}>Submit</Button>
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
