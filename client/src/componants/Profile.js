import React from 'react'
import GitHub from './GitHub'
import GitLab from './GitLab'
import BitBucket from './BitBucket'
import './Profile.css'

export default function Profile( props ) {
    const { accounts, vcsChosen} = props

    switch (vcsChosen) {
        case 0:
            //Return Github profile
            return (
                <div className="profile-div">
                    <GitHub accounts={accounts} vcsChosen={vcsChosen}/>
                </div>
            )
        case 1:
            // Return Gitlab
            return (
                <div className="profile-div">
                    <GitLab accounts={accounts} vcsChosen={vcsChosen}/>
                </div>
            )
        case 2:
            // Return bitbucket
            return (
                <div className="profile-div">
                    <BitBucket accounts={accounts} vcsChosen={vcsChosen}/>
                </div>
            )
        default:
            return (
                <div>     
                </div>
            )

    }
}
