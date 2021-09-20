import React from 'react'

export default function Results( props ) {
    const { accounts, setVcsFunction, vcsChosen } = props;
    // array of vcs providers
    const sites = ["GitHub", "GitLab", "BitBucket"]
    let counter = -1;
    // map for all my account prop
    let results = accounts.map( (item, index) => {
        counter++
        let assignedClass = (counter === vcsChosen ? "result-block active-block" : "result-block")
        // Stores result from query
        let result;
        if (sites[counter] === "GitHub") {
            result = (
                <div key={index} className={assignedClass}>
                    <p className="result-title">{sites[counter]}</p>
                    {((item.login === undefined) ? <p>User not found</p> : <p className="response-name" id={counter} onClick={e => setVcsFunction(e.target.id)}>{item.login}</p>)}
                </div>
            )
        }else if (sites[counter] === "GitLab") {
            result = (
                <div key={index} className={assignedClass}>
                    <p className="result-title">{sites[counter]}</p>
                    {((item.length === 0) ? <p>User not found</p> : <p className="response-name" id={counter} onClick={e => setVcsFunction(e.target.id)}>{item.username}</p>)}
                </div>
            )
        }else if (sites[counter] === "BitBucket") {
            result = (
                <div key={index} className={assignedClass}>
                    <p className="result-title">{sites[counter]}</p>
                    {((item.type === "Error") ? <p>{item.reason}</p> : <p className="response-name" id={counter} onClick={e => setVcsFunction(e.target.id)}>{item.nickname}</p>)}
                </div>
            )
        }
        return result
    });
    // Event listener to listen to any events
    let blocks = document.getElementsByClassName("response-name");
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener("click", function() {
            let current = document.getElementsByClassName("active-block");
            if (current.length > 0) { 
                current[0].className = current[0].className.replace(" active-block", "");
            }
            this.parentNode.className += " active-block";
        });
    }
    return (
        <div id="result-row">
            {results}
        </div>
    )
}
