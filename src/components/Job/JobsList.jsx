import React, {useEffect, useState} from "react";
import JoblyApi from "../../api";
import JobCard from "./JobCard";
import SearchBar from "../SearchBar";


const JobsList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function getJobs() {
            let postions = await JoblyApi.getJobs()
            setJobs(postions)
        }
        getJobs();
    }, []);

    const search = async (q) => {
        let jobs = await JoblyApi.getJobs(q);
        setJobs(jobs)
    }

    return (
        <section>
            <SearchBar searchFor={search} />
            <div className="col-md-10 offset-md-1" >
                {jobs.map(j => <JobCard key={j.id} job={j} />)}
            </div>
        </section>
    )
    
}

export default JobsList;