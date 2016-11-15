import React, {Component} from 'react'
import { connect } from 'react-redux'
import NoticeBoard from './NoticeBoard'


class noticeboarContainer extends Component {


    render() {
        return ( <div>
                <NoticeBoard />
            </div>)
    }
}

function mapStateToProps(state){
    return {
        state : state
    }
}

export default connect(mapStateToProps) (noticeboarContainer)