/**
 * @copyright 2015, TuringLab <info@turinglab.com>
 */

import React from 'react'
import sb2 from './scratchblocks2'
import Scratchblock from './Scratchblock'

class Scratchblocks extends React.Component {

    constructor() {
        super();
        this.sb2 = new sb2();
        this.code = 'repeat 10\n\tsay [Hello]'
    }

    classNames() {
        let classNames = [];
        classNames.push('sb2');
        // classNames.push('inline-block');
        return classNames;
    }

    render() {
        let scripts = this.sb2.parse_scripts(this.code);
        console.log(scripts);
        return (
          <div className="sb2">
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


export default Scratchblocks