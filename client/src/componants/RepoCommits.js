import React from 'react'

export default function RepoCommits( props ) {
    const { commitMsg } = props;
    // Maps the commit messages
    const myItems = commitMsg.map((msg, index) =>
        <li key={index.toString()}>
            {msg}
        </li>
    );
    
    return (
        <ul>
            {myItems}
        </ul>
    )
}
