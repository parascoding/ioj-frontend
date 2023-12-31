import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Box from "../../layouts/Box";
import { Button, Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col sm={{ size: 6, offset: 3 }}>
            <Button block onClick={() => {
              navigate('/user/compete');
            }}>Compete</Button>
            <Button className="mt-3" color="success" block onClick={() => {
              navigate('/admin/createContest');
            }}>Add Contest</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AdminHome;
