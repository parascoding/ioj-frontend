import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Box from "../../layouts/Box";
import { Button, Col, Container, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 6, offset: 3 }}>
            <Button block onClick={() => {
              navigate('/user/compete');
            }}>Compete</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default UserDashboard;
