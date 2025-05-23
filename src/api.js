import axios from "axios";

const BASE_URL = (import.meta.env.DEV === true) ? 'http://localhost:1001' : import.meta.env.VITE_BASE_URL;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes


/** register */
  static async makeUser(data){
    let res = await this.request(`auth/register`, data, 'post');
    return res.token;
  }

  /** login  */
  static async getToken(data){
    let res = await this.request(`auth/token`, data, 'post');
    return res;
  }

  static async getCurrentUser(username){
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateCurrentUser(username, data){
    let res = await this.request(`users/${username}`, data, 'patch')
    return res;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // obviously, you'll add a lot here ...

  static async getCompanies(search){
    let res = await this.request(`companies/`);

    if (!search){
      return res.companies
    }

    let filterList = res.companies.filter(c => c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    return filterList;
  }

  static async getJobs(search){
    let res = await this.request(`jobs/`);

    if (!search){
      return res.jobs
    }

    let filterList = res.jobs.filter(j => j.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    return filterList;
  }

  static async applyToJob(username, jobId){
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, 'post')
    return res;
  }
  
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


    export default JoblyApi;