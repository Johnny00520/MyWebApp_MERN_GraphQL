import React from 'react';
import { useState } from 'react';
import { Button, Divider, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './Adminlayout.scss';
import Login from '../login/Login';

const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const Adminlayout = (props) => {
    const [windowDimensions] = useState(getWindowDimensions());

    // console.log({windowDimensions})
    const { width } = windowDimensions;

    // useEffect() : just like componentDidMount
    // useEffect(() => {
    //     setWindowDimensions = () => {
    //         width:
    //     }

    //     function handleResize() {
    //         setWindowDimensions(getWindowDimensions());
    //     }
    // })

    return (
        <div className="adminlayout_page">

            <div className="adminlayout_container">
        
                <div className="adminlayout_wrapper">
                
                    <Segment placeholder>
                        <Grid columns={2} stackable>
                            <Grid.Column>
                                <Login {...props}/>
                            </Grid.Column>

                            <div className={width > 376 ? "divider_none" : "divider_responsible"}>
                                <Divider horizontal>or</Divider>
                            </div>
                        
                            <Grid.Column verticalAlign='middle'>
                                <Link to="/register">
                                    <Button content='Sign up' icon='signup' size='big' />
                                </Link>
                            </Grid.Column>

                        </Grid>
                    
                        <div className={width > 375 ? "" : "divider_none"}>
                            <Divider vertical>or</Divider>
                        </div>
                    </Segment>

                </div>
            </div>
        </div>
    )
}

export default Adminlayout;
