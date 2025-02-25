import { useEffect, useState } from "react";
import Banner from "../components/Banner"
import Jobs from "./Jobs";
import Card from "../components/Card";
import Sidebar from "../sidebar/Sidebar";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
   useEffect(() => {
    fetch("jobs.json").then(res => res.json()).then(data => {
      // console.log(data)
      setJobs(data)
    })
   }, [])
  //  console.log(jobs)
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
      setQuery(event.target.value)
  }
  const filteredItems = jobs.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  //  console.log(filteredItems);
  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }

const filteredData = (jobs, selected, query) => {
  let filteredJobs = jobs;
  if(query){
    filteredJobs = filteredItems;
  }

  if(selected){
    filteredJobs = filteredJobs.filter(({jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate}) => (
      jobLocation.toLowerCase() === selected.toLowerCase() || 
      parseInt(maxPrice) <= parseInt(selected) ||
      salaryType.toLowerCase() === selected.toLowerCase() ||
      employmentType.toLowerCase() === selected.toLowerCase()
    ));
    console.log(filteredJobs);
  }
  return filteredJobs.map((data, i) => <Card key={i} data={data}/>)
}  

const result = filteredData(jobs, selectedCategory, query);

  return (
   <div>
    <Banner query={query} handleInputChange={handleInputChange}/>


    <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">

      <div className="bg-white p-4 rounded">
        <Sidebar handleChange={handleChange} handleClick={handleClick}/>
      </div>


      <div className="col-span-2 bg-white p-4 rounded"><Jobs result={result}/></div>


      <div className="bg-white p-4 rounded">Right</div>
      {/* <Jobs result={result}/> */}
    </div>
   </div>
  )
}

export default Home
