import React, { Component } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import {colors} from '../../constants/colors_blue'


class Pager extends Component {
  handleClickNext(){
    this.props.paginationCall({ type: 'next', url:this.props.pages.next} )
  }

  handleClickLast(){
    this.props.paginationCall({ type: 'last', url:this.props.pages.last} )
  }

  handleClickFirst(){
    this.props.paginationCall({ type: 'fist', url:this.props.pages.first})
  }

  handleClickPrev(){
    this.props.paginationCall({ type: 'prev', url:this.props.pages.prev} )
  }



  render(){
    const active = {
      backgroundColor : colors.c4,
      color : colors.black
    }

    const inActive = {
      backgroundColor : colors.c2,
      color : colors.lightGrey
    }

    const firstButton = this.props.pages.first ? (<li style={active} onClick={this.handleClickFirst.bind(this)}className="first">First</li>) : <li style={inActive}className="first">First</li>
    const nextButton = this.props.pages.next ? (<li style={active} onClick={this.handleClickNext.bind(this)}className="next">Next</li>) : <li style={inActive} className="next">Next</li>
    const prevButton = this.props.pages.prev ? (<li style={active} onClick={this.handleClickPrev.bind(this)}className="prev">Prev</li>) : <li style={inActive} className="prev">Prev</li>
    const lastButton = this.props.pages.last ? (<li style={active} onClick={this.handleClickLast.bind(this)}className="last">Last</li>) : <li style={inActive} className="last">Last</li>


      return(
        <div className="col-md-12">
          <div className="container">
            <nav>
              <ul className="pager">
                {firstButton}
                {prevButton}
                {nextButton}
                {lastButton}
              </ul>
            </nav>
          </div>
        </div>);
    }
  }


export default Pager;
