// import React from 'react'
// import Filter from '../components/Filter'
// import { useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Error from '../components/Error'
// import Card from '../components/Card'

// const JobList = () => {
//   const {jobs,error,isLoading}=useSelector((store)=>store)
//   return (
//     <div className='list-page'>
//       <Filter/>

//       {isLoading ? <Loader/>: error ? <Error/> : <div className='cards-wrapper'>
//         {jobs.map((i)=>(
//           <Card key={i.id} job={i}/>
//         ))}
//         </div>}
//     </div>
//   )
// }

// export default JobList

import React from 'react';
import Filter from '../components/Filter';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Card from '../components/Card';

// Basit seçiciler
const selectJobs = (state) => state.jobs;
const selectError = (state) => state.error;
const selectIsLoading = (state) => state.isLoading;

const JobList = ({retry}) => {
  const jobs = useSelector(selectJobs);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className='list-page'>
      <Filter/>
      

      {isLoading ?<Loader/>  : error ? <Error message={error} retry={retry}/> : (
        <div className='cards-wrapper'>
        {jobs.map((i) => (
          <Card key={i.id} job={i}/>
        ))}
      </div> 
        
      )}
    </div>
  );
}

export default JobList;