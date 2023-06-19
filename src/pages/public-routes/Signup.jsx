import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { doLogin, doLogout, getRole } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/auth/auth";
import logo  from "../../img/logo.png"
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    id: "",
    password: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const navigate = useNavigate();

  const handleChange = (event, field) => {
    setData({ ...data, [field]: event.target.value });
  };
  const submitForm = (event) => {
    event.preventDefault();

    // Validitate Data
    if (data.id.trim() == "" || data.password.trim() == "") {
      toast.error("Username/Password can't be empty");
    }
    // Call API
    signUp(data)
      .then((response) => {
        console.log(response);
        if(!response.isSuccess)
          throw new Error(response.message);
        toast.success(response.message);
        setError({
          errors: {},
          isError: false,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setError({
          errors: error,
          isError: true,
        });
      });
    // doLogin(data.id, () => {
    //   console.log("Login details are stored");
    //   navigate('/user/dashboard');
    // });
  };
  const resetDetails = () => {
    setData({});
  };
  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Card color="dark" inverse>
              <CardHeader>
                {/* <h3 className='d-flex justify-content-center'>Login on AMS.</h3> */}
              </CardHeader>
              <CardBody>
                <img src={logo} width="50%" />
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label for="name">Enter Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter Here"
                      id="name"
                      onChange={(e) => {
                        handleChange(e, "name");
                      }}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.id}
                    </FormFeedback>
                  </FormGroup>
                  {/*Id Filed*/}
                  <FormGroup>
                    <Label for="id">Enter Id</Label>
                    <Input
                      type="text"
                      placeholder="Enter Here"
                      id="id"
                      onChange={(e) => {
                        handleChange(e, "id");
                      }}
                      value={data.id}
                      invalid={error.errors?.response?.data?.id ? true : false}
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.id}
                    </FormFeedback>
                  </FormGroup>

                  {/*Password Filed*/}
                  <FormGroup>
                    <Label for="password">Enter Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter Here"
                      id="password"
                      onChange={(e) => {
                        handleChange(e, "password");
                      }}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  {/*Button*/}
                  <Container className="text-center">
                    <Button color="success" className="m-3">
                      Login
                    </Button>
                    <Button
                      color="danger"
                      type="reset"
                      className="m-3"
                      onClick={resetDetails}
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Signup;
