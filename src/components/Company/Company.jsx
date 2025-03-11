import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import JoblyApi from '../../api';
import JobCard from '../Job/JobCard'

const Company = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle));
        }
        getCompany()
    }, [handle])


    if (!company) return (
        <div className="LoadingSpinner">
        Loading ...
        </div>
    )

    return (
        <section>
            <h1>{company.name}</h1>
            <h3>Jobs: </h3>
            {company.jobs.map(j => (
                <JobCard key={j.id} job={j} />
            ))}
        </section>
    )

}

export default Company;