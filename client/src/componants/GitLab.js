import React, { Component } from 'react'
import Repos from './Repos';
import loader from '../media/loader.gif'

export default class GitLab extends Component {
    
    constructor( props ) {
        super( props );
        // Declaring my states
        this.state = {
            repos: null,
            isLoaded: false
        }
    }
    

    // Fetches the repos for onload
    componentDidMount() {
        fetch('/user/gitlab/repo/' + this.props.accounts[1].username)
        .then(res => res.json())
        .then( (response) => {
            // States are set
            this.setState({
                repos: response,
                isLoaded: true
            })
        })
        // If there is an error ertrun to user and say there is an error
        .catch((error) => {
        console.log(error )
        })
    }
    
    render() {
        const { accounts, vcsChosen } = this.props;
        // Shows the users details first while the repo list is loading
        if (!this.state.isLoaded) {
            return (
                <div>
                    <div className="top-container">
                        <div className="row">
                            {/* Profile picture section */}
                            <div className="pro-pic-div col-4">
                                <img alt="profile-avatar" className="profile-picture" src={accounts[vcsChosen].avatar_url}></img>
                            </div>
                            {/* Side info section */}
                            <div className="side-info col-8">
                                <p><i className="fa fa-user-circle-o" aria-hidden="true"></i>&emsp;{accounts[vcsChosen].username}</p>
                                <p><i className="fa fa-address-card" aria-hidden="true"></i>&emsp;{accounts[vcsChosen].name}</p>
                                <p><i className="fa fa-quote-left" aria-hidden="true"></i>&emsp;{accounts[vcsChosen].bio}</p>
                                <p><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&emsp;{accounts[vcsChosen].location}</p>
                                <a href={accounts[vcsChosen].web_url} target="blank"><button >Go to Gitlab</button></a>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    {/* Extra information section */}
                    <div className="second-info">
                        <p>Followers: {accounts[vcsChosen].followers}</p>
                        <p>Following: {accounts[vcsChosen].following}</p>
                    </div>
                    <hr></hr>
                    {/* Repository section section */}
                    <div className="loading-div">
                        <h2>Loading recent repos</h2>
                        <img alt="loading-gif" className="loadingGif" src={loader}></img>
                    </div>
                </div>
            )
        // Shows the repo list once it has finished loading
        }else {
            return (
                <div>
                    <div className="top-container">
                        <div className="row">
                            {/* Profile picture section */}
                            <div className="pro-pic-div col-4">
                                <img alt="profile-avatar" className="profile-picture" src={accounts[vcsChosen].avatar_url}></img>
                            </div>
                            {/* Side info section */}
                            <div className="side-info col-8">
                                <p><i className="fa fa-user-circle-o" aria-hidden="true"></i>&emsp;{accounts[vcsChosen].username}</p>
                                <p><i className="fa fa-address-card" aria-hidden="true"></i>&emsp;{accounts[vcsChosen].name}</p>
                                <p><i className="fa fa-quote-left" aria-hidden="true"></i>&emsp;{accounts[vcsChosen].bio}</p>
                                <p><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&emsp;{accounts[vcsChosen].location}</p>
                                <a href={accounts[vcsChosen].web_url} target="blank"><button >Go to Gitlab</button></a>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    {/* Extra information section */}
                    <div className="second-info">
                        <p>Followers: {accounts[vcsChosen].followers}</p>
                        <p>Following: {accounts[vcsChosen].following}</p>
                    </div>
                    <hr></hr>
                    {/* Repository section section */}
                    <div>
                        <h3>Repositories</h3>
                    </div>
                    <div>
                        <Repos repos={this.state.repos}/>
                    </div>
                </div>
            )
        }
        
    }
}
