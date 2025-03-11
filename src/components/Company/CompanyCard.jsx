import React from 'react';
import {Card, CardBody, CardTitle, CardText} from 'reactstrap';
import {Link} from 'react-router-dom';
import './CompanyCard.css';

const CompanyCard = ({company}) => (
        <Card className='CompanyCard'>
            <Link to={`/companies/${company.handle}`}>
            <CardBody>
                <CardTitle>
                    {company.name}
                </CardTitle>
                <CardText>
                    {company.description}
                </CardText>
            </CardBody>
            </Link>
        </Card>

)

export default CompanyCard;