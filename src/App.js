import React, { useState } from 'react'
import SearchForm from './components/SearchForm'
import Datadisplay from './components/Datadisplay'
import RepoForm from './components/RepoForm'
import Pagination from './Pagination'
import "./App.css"

export default function App() {
  const [userData,setUserData] = useState(null)
  const [repos,setRepos] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const [perPage] =useState(5)
  const [page,setPage] = useState(1)
  const [noReposFound, setNoReposFound] = useState(false) 
  const fetchData = async(username)=>{
    try{
       const userResponse =await fetch(`https://api.github.com/users/${username}`)
       if(userResponse.ok){
        const userData = await userResponse.json()
        setUserData(userData)
        console.log(userData)


        const repoResponse = await fetch(`${userData.repos_url}?page=${page}`)
        if(repoResponse.ok){
          const reposData = await repoResponse.json()
          setRepos(reposData)
          console.log(reposData)
        }else {
          throw new Error("Failed to fetch any user repository")
        }
        setNoReposFound(userData.length === 0) 
       } else {
        throw new Error("User Not Found")
       }
      } catch(error){
        console.log(error)
        setUserData(null)
        setNoReposFound(true)
      }
  }
const indexOfLastRepo = currentPage * perPage
  const indexOfFirstRepo =  indexOfLastRepo - perPage
  const currentRepos = repos.slice(indexOfFirstRepo,indexOfLastRepo)
  const paginate =(pageNumber) =>{
    setCurrentPage(pageNumber)
  }
  return (
    <div className='app'>
       <video className="background-video" autoPlay loop muted>
        <source src="https://s3.eu-west-1.amazonaws.com/eu-west-1.vimeo.com/videos/657/905/657905493.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZRUUNWVAWWO32QM7%2F20230710%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230710T181553Z&X-Amz-Expires=172800&X-Amz-SignedHeaders=host&X-Amz-Signature=5803bb5eb084e48b0b32a53f9655bb678ae79a379d82033026bc59ef8b3b3c26" type="video/mp4" />
      </video>
      <h1>GitHub user Finder</h1>
      <SearchForm fetchData = {fetchData}/>
      {userData && <Datadisplay user={userData}/>}
      {currentRepos.length>0?(
        <>       
        <RepoForm repos={currentRepos} page={page} setPage={setPage}/>
        <Pagination 
        totalRepos={repos.length}
        reposPerPage={perPage}
        currentPage={currentPage}
        paginate={paginate}/>
        </>
      ):(
        noReposFound && (
          <div>
            <p>No Repository Found</p>
          </div>
     ) // we set norepos to false first then we check and later set it to true
)}
      
    </div>
  )
}