import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import axios from 'axios';

import Scream from '../components/Scream';

class home extends Component {

    state = {
        screams: null
    }

    componentDidMount() {
        axios.get('/screams')
            .then(res => {
                console.log('Here is areturn data', res.data)
                this.setState({
                    screams: res.data
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map((scream , i) => (
                <Scream key={scream.screamId} scream={scream} key={ i }/>
            ))
        ) : (
            <p>Loading...</p>
        );
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>

                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
