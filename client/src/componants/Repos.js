import React from 'react'
import RepoCommits from './RepoCommits';
import './Repos.css'

export default function Repos(props) {
    // Props deconstruction
    const { repos } = props

    //map out the map
    let repo = repos.map((item, index) => {
        return (
            <div key={index}>
                <div className="repo-block">
                    <div className="repo-heading">
                        <p>{item.repoName} <br></br> <span className="repo-desc">{((item.repoDesc === undefined) ? "No Description" : item.repoDesc)}</span></p>
                        <div className="date-created-div">
                            <p>Created - {item.createdOn}</p>
                        </div>
                    </div>
                    <div className="repo-commit-heading">
                        <p>Commit History</p>
                    </div>
                    <div className='repo-commits'>
                        <RepoCommits commitMsg={item.commitMsg} />
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div>
            {repo}
        </div>
    )
}
