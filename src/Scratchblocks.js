/**
 * Copyright 2013, Tim Radvan
 * @license MIT
 * http://opensource.org/licenses/MIT
 *
 * Converted to React by TuringLab <info@turinglab.com>
 */

import React from 'react'

import sb2 from './scratchblocks2'
import Scratchblock from './Scratchblock'

import './scratchblocks2.css'

class Scratchblocks extends React.Component {

  constructor() {
    super();
    this.sb2 = new sb2();
  }

  // Define classes for code
  classNames() {
    let classNames = [];
    classNames.push('sb2');
    if (this.props.inline){
      classNames.push('inline-block');
    }
    return classNames.join(' ');
  }

  // Format the code string before parsing
  parseScripts(code) {
    code = code.replace(/<br>\s?|\n|\r\n|\r/ig, '\n');
    if (this.props.inline) {
      code = code.replace('\n', '');
    }
    return this.sb2.parse_scripts(code);;
  }

  render() {
    const scripts = this.parseScripts(this.props.code);
    return (
      <div className={this.classNames()}>
        {scripts.map((script,i) => (
          <Scratchblock key={i} className="script" script={script}/>
        ))}
      </div>
    );
  }

}

Scratchblocks.propTypes = {
  code: React.PropTypes.string,
  inline: React.PropTypes.bool,
}

Scratchblocks.defaultProps = {
  code: 'if <(score) < (10)> then\n\tchange y by (-10)\n\tset [score] to ((-1) * (score))\nend',
  inline: false
}

export default Scratchblocks