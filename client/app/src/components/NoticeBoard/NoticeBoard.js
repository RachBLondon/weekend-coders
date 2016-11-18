import React, {Component} from 'react';

export default class NoticeBoard extends Component {
    renderProjects(){
        if(this.props.projects) {
            return this.props.projects.map(project=> {
                return (<li> {project.name} </li>)
            });
        }
    }

    render(){
        return <div>
                    <h1> NoticeBoard </h1>
                    <ul>
                        {this.renderProjects()}
                    </ul>
                </div>
    }
}