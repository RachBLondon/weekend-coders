import React, {Component} from 'react'
import ShortList from './ShortList'
import { connect } from 'react-redux'
import {getShortList} from './../../actions'


class shortListContainer extends Component {
    componentWillMount(){
        this.props.getShortList()
    }

    render() {
        return (<ShortList  />)
    }
}
export default connect(null, {getShortList})(shortListContainer)