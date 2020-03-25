import React, {Component} from 'react';
import classes from './Searchbar.module.css';
import searchLogo from '../../../assets/icons/search.svg';

class Searchbar extends Component {

    state = {
        val: ""
    }

    componentDidMount () {
        this.timer = null;
        this.setState((prevState, prevProps) => {
            if (typeof(prevProps.val) === "string")
                return {val: prevProps.val};
        });
    }

    searchChangeHandler = (e) => {
        const inputVal = e.target.value;
        this.setState({val: inputVal});
        this.props.setQuery(inputVal !== "");
        if(this.timer)
                clearTimeout(this.timer);
        if (inputVal)
            this.timer = setTimeout(()=>{this.props.setQuery(inputVal)}, 1000); 
    }

    render() {
        return (
            <div className={classes.Searchbar}>
                <img alt="Search Icon" src={searchLogo} className={classes.SearchLogo}/>
                <input onChange={(e)=>{this.searchChangeHandler(e)}} 
                    placeholder="Search for an album..."
                    value={this.state.val}/>
            </div>
        )
    }
}

export default Searchbar;