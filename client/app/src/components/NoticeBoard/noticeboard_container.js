import React, {Component} from 'react';
import { connect } from 'react-redux';
import NoticeBoard from './NoticeBoard';
import { getProjects } from './../../actions'


class noticeboarContainer extends Component {
    componentWillMount(){
        this.props.getProjects();
    }


    render() {
        return ( <div>
                <NoticeBoard projects={this.props.projects} />
            </div>)
    }
}

function mapStateToProps(state){
    return {
        projects : state.projects
    }
}

export default connect(mapStateToProps, {getProjects}) (noticeboarContainer)