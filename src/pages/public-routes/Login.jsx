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
  CardImg,
} from "reactstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import {doLogin, doLogout, getRole } from "../../services/auth/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth/auth";
import logo from "../../img/logo.png";
import { addToken } from "../../services/base";
import { myAxios } from "../../services/base";
const Login = () => {
  const [data, setData] = useState({
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
    // console.log(data);
  };
  const submitForm = (event) => {
    event.preventDefault();

    // Validitate Data
    if (data.id.trim() == "" || data.password.trim() == "") {
      toast.error("Username/Password can't be empty");
    }
    // Call API
    login(data)
      .then((response) => {
        console.log(response);
        if(response?.isSuccess ==  true){
          console.log("sucess");
          toast.success("Loggedd In!");
          setError({
            errors: {},
            isError: false,
          });
          doLogin(response, () => {
            console.log("Login details are stored");
          });
          
          navigate("/" + getRole().toLowerCase() + "/dashboard");
        } else{
          throw new Error(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
        setError({
          errors: error,
          isError: true,
        });
      });
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
              <CardBody>
                <img 
                  src={logo}
                  width="500rem"
                  // loading="true"  
                  className="mx-5"
                />
                <Form onSubmit={submitForm}>
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
                      value={data.name}
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
export default Login;
