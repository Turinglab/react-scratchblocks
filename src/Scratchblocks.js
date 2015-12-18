/**
 * @copyright 2015, TuringLab <info@turinglab.com>
 */

import React from 'react'
import jQuery from 'jQuery'
import scratchblocks from 'scratchblocks'

class Scratchblocks extends React.Component {

  componentDidMount() {
    jQuery(React.findDOMNode(this.refs.tooltip)).tooltip();
  }

  render() {
    return <div ref="tooltip">Hello Friend</div>
  }

}

export default Scratchblocks