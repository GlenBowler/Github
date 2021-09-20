import React, { Component } from 'react'
import Results from './Results';
import loader from '../media/loader.gif'
import './Home.css'
import Profile from './Profile';

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            searchedName: "",
            accounts: null,
            vcsChosen: null,
            loadingRes : false,
            isLoaded: false
        }
        //Declare my bindings
        this.getResults = this.getResults.bind(this);
        this.eventHandler = this.eventHandler.bind(this);
        this.setVcs = this.setVcs.bind(this);
    }
    //Setting my choices
    setVcs( val ) {
        this.setState({
            vcsChosen: parseInt(val)
        })
    }

     // return all states to dafault
    eventHandler(e) {
        e.preventDefault();
        this.setState({
            loadingRes: true,
            accounts: null,
            isLoaded: false,
            vcsChosen: null
        })  
        this.getResults()    
    }
    
        //Get result using searchedname by user
    getResults() {
        fetch('/get-user/' + this.state.searchedName)
        .then(res => res.json())
        .then( (response) => {
             // Sets the states
            this.setState({
                accounts: response,
                isLoaded: true,
                loadingRes: false
            })
        })
         // If errror return to user that there is erroor
        .catch((error) => {
        console.log(error )
        })
    }

    render() {
        if (this.state.isLoaded === false) {
            return (
                <div className="home-screen">
                    <div className="search-div">
                        <form  className="my-form" onSubmit={(e) => this.eventHandler(e)}>
                            <input onChange={ (e) => this.setState({searchedName : e.target.value}) }  required type="text" placeholder="Search username..." name="search"/>
                            <button className="search-btn" type="submit"><i className="fa fa-search"></i></button>
                        </form>
                    </div>
                    <div>
                        {((this.state.loadingRes === true) ? <img alt="loading-gif" className="loadingGif" src={loader}></img> : null)}
                    </div>
                    <Profile userName={this.state.searchedName} accounts={this.state.accounts} vcsChosen={this.state.vcsChosen}/>
                </div>
            )
        } else {
        return (
                <div className="home-screen">
                    <div className="searchbar">
                        <form  className="my-form" onSubmit={(e) => this.eventHandler(e)}>
                            <input onChange={ (e) => this.setState({searchedName : e.target.value}) }  required type="text" placeholder="Search username..." name="search"/>
                            <button className="search-btn" type="submit"><i className="fa fa-search"></i></button>
                        </form>
                    </div>
                    <Results setVcsFunction={this.setVcs} loadingRes={this.state.loadingRes} accounts={this.state.accounts} vcsChosen={this.state.vcsChosen} />
                    <Profile userName={this.state.searchedName} accounts={this.state.accounts} vcsChosen={this.state.vcsChosen}/>
                </div>
            ) 
        }
        
        
    }
}
