import React, { useContext, useEffect, useState } from 'react';
import {Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem, Button} from 'reactstrap';
import './Job.css';
import UserContext from '../../UserContext';

const JobCard = ({job}) => {
    
    const {hasApplied, applyToJob} = useContext(UserContext);
    const [applied, setApplied] = useState();

    useEffect(function updateAppliedStatus() {
        setApplied(hasApplied(job.id));
      }, [job.id, hasApplied]);

    const handelApplication = async (e) => {
        if (hasApplied(job.id)) return;

        applyToJob(job.id);
        setApplied(true);
    }

    return (
        <Card className='JobCard'>
        <CardBody>
            <CardTitle>
                <h3>{job.title}</h3>
                <h6>{job.companyName}</h6>
            </CardTitle>
            <ListGroup>
                    <ListGroupItem>Salary: {job.salary}</ListGroupItem>
                    <ListGroupItem>Equity: {job.equity}</ListGroupItem>
                </ListGroup>
            <CardText>
            </CardText>
            <Button 
                onClick={handelApplication}
                disabled={applied}
                className='apply-btn'
            >{applied ? 'Applied' : 'Apply'}</Button>
        </CardBody>
    </Card>
    )
}

export default JobCard;