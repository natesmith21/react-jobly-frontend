import React, {useState} from "react";
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './SearchBar.css'

const SearchBar = ( { searchFor }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = evt => { 
      setSearchTerm(evt.target.value)
      };


      const submitSearch = evt => {
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined);
      };

      return (
            <Form className="col-md-8 offset-md-2 searchBar" onSubmit={submitSearch}>
                <Label htmlFor="q"/>
                <Input
                    onChange={handleChange}
                    value={searchTerm}
                    type="text"
                    id="q"
                    name='search'
                    placeholder="search"
                >
                </Input>
                <Button>Submit</Button>
            </Form>
      )

}

export default SearchBar;