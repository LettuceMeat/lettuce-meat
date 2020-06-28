import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkCreateRestaurant } from '../store/thunks';


class RestaurantForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            yelpId: '',
            expiration: new Date(),
        };
        this.create = this.create.bind(this);
    };
    create() {
        const { name, yelpId, expiration } = this.state;
        if (name && yelpId && expiration) {
            const restaurant = {
                name,
                yelpId,
                sponsored: true,
                sponsorshipExpiration: expiration,
            }
            this.props.create(restaurant);
        };
    };

    render() {
        const { create } = this;
        const { name, yelpId, expiration } = this.state;
        return (
            <form onSubmit={ ev => ev.preventDefault() }>
                <input type='text' value={name} placeholder='Restaurant Name'
                    onChange={ ev => this.setState({ name: ev.target.value })}></input>
                <input type='text' value={yelpId} placeholder='Yelp ID'
                    onChange={ ev => this.setState({ yelpId: ev.target.value })}></input>
                <input type='date' value={expiration}
                    onChange={ ev => this.setState({ expiration: ev.target.value })}></input>
                <button onClick={ () => create() }>Submit</button>
            </form>
        )
    }
};

const mapStateToProps = ({ restaurants }) => {
    return {
        restaurants
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        create: (restaurant) => {
            dispatch(thunkCreateRestaurant(restaurant));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantForm);
