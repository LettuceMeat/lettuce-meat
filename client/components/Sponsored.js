import React, {Component} from 'react'
import {getSponsoredRestaurants} from '../store/thunks'
import { connect } from 'react-redux'

class Sponsored extends Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
            <div className='adminContainer'>
                <div className='adminLeft'>
                    Sponsored
                </div>
                <div className='adminRight'>
                    Add form
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        sponsoredRestaurants: state.sponsoredRestaurants
    }
}

const mapDispatchToProps = dispatch => {
    return {
        get: () => dispatch(getSponsoredRestaurants)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sponsored)
