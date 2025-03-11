import React, {useContext} from "react";
import {Card, CardBody, CardTitle} from 'reactstrap';
import UserContext from "../UserContext";


function Home() {
  const { currentUser } = useContext(UserContext);
    return (
      <Card className="home col-md-10">
      <CardBody className="text-center">
        <CardTitle>
          <h1>
          {(currentUser) ? `Welcome back ${currentUser.firstName}!` : `Welcome to Jobly`}
          </h1>
        </CardTitle>
      </CardBody>
    </Card>
    );
}

export default Home;