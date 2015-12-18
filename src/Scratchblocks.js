/**
 * @copyright 2015, TuringLab <info@turinglab.com>
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
          <div key={i}>
            {script.map((block,j) => (
              <Scratchblock key={j} block={block} />
            ))}
          </div>
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
  code: 'if <key [down arrow] pressed?> then\n\tchange y by (-10)\nend',
  inline: false
}

export default Scratchblocks