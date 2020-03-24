import React, {Component} from 'react';
import PopularRow from './PopularRow/PopularRow';
import classes from './Popular.module.css';

const POPULAR_CATEGORIES = ["Indie", "Pop", "Hip-Hop", "Electronic"];

class Popular extends Component {

    render() {
        return (
            <React.Fragment>
                <div className={classes.TopFiveHeader}>Top Five</div>
                {POPULAR_CATEGORIES.map((cat)=>(
                    <PopularRow  
                    category={cat} 
                    key={Math.random().toString()}/>
                ))}
            </React.Fragment>
        );
    }
}    

export default Popular;
