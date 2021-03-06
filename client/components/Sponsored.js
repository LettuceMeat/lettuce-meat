import React, {Component} from 'react'
import {getSponsoredRestaurants} from '../store/thunks'
import { connect } from 'react-redux'
import RestaurantForm from './RestaurantForm'

class Sponsored extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    componentDidMount() {
        this.props.get();
    }

    render() {
        const {sponsoredRestaurants} = this.props;
        return (
            <div className='adminContainer'>
                <div className='adminLeft'>
                    <p>Sponsored</p>
                    {sponsoredRestaurants && sponsoredRestaurants.map(restaurant => {
                        return (
                            <>
                                <div>Name: {restaurant.name}</div>
                                <div>Yelp ID: {restaurant.yelpId}</div>
                                <div>Expiration Date: {restaurant.sponsorshipExpiration.slice(0, 10)}</div>
                                <br />
                            </>
                        )
                    })}
                </div>
                <div className='adminRight'>
                    <p>Add form</p>
                    <RestaurantForm />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sponsoredRestaurants: state.restaurants
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get: () => dispatch(getSponsoredRestaurants())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sponsored)
