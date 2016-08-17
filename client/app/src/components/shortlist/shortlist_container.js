import React, {Component} from 'react'
import ShortList from './ShortList'
import { connect } from 'react-redux'
import {getShortList} from './../../actions'


class shortListContainer extends Component {
    componentWillMount(){
        this.props.getShortList()
    }

    render() {
        return (<ShortList shortlist={this.props.shortlist} />)
    }
}

function mapStateToProps(state){
    return {
        shortlist : state.shortlist,
        profile : state.profile
    }
}
export default connect(mapStateToProps, {getShortList})(shortListContainer)