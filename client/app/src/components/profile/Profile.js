import React, {Component} from 'react'

export default class ShortList extends Component {
    showProfile(profile) {
        if (profile) {
            return (
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-2">
                            <img src={this.props.profile.pictureURL} alt="..." className="img-circle"/>
                        </div>
                        <div className="col-md-10">
                            <h3>{this.props.profile.firstName + ' ' + this.props.profile.lastName}</h3>

                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">Profile</div>
                {this.showProfile(this.props.profile)}
            </div>
        )
    }
}
