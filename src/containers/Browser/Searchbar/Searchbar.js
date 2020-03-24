import React from 'react';
import classes from './Searchbar.module.css';
import searchLogo from '../../../assets/icons/search.svg';


const searchBar = () => (
    <div className={classes.Searchbar}>
        <img alt="Search Icon" src={searchLogo} className={classes.SearchLogo}/>
        <input placeholder="Search for an album..."/>
    </div>
);

export default searchBar;