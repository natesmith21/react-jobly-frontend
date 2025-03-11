import React, {useEffect, useState} from "react";
import JoblyApi from "../../api";
import CompanyCard from "./CompanyCard";
import SearchBar from "../SearchBar";


const CompaniesList = () => {
    const [cos, setCos] = useState([]);

    useEffect(() => {
        async function getCompanies() {
            let comps = await JoblyApi.getCompanies()
            setCos(comps)
        }
        getCompanies();
    }, []);

    const search = async (q) => {
        let comps = await JoblyApi.getCompanies(q);
        setCos(comps)
    }

    return (
        <section>
            <SearchBar searchFor={search} />
            <div className="col-md-10 offset-md-1" >
            {cos.map(c => <CompanyCard key={c.handle} company={c} />)}
            </div>
        </section>
    )
    
}

export default CompaniesList;