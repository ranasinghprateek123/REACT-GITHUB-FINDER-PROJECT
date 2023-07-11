import React from 'react'

export default function RepoForm({repos}) {
  return (
    <div className='repo-list'>
        <h2>Repositories</h2>
        <ul>
            {repos.map((repo)=> (
                <li key={repo._id}> 
                    <a href={repo.html_url} target='_blank' rel='noreferrer'>{repo.name}</a>
                </li>
            ))}
        </ul>
        
    </div>
  )
}