/**
 * Original Copyright 2013, Tim Radvan
 * @license MIT
 * http://opensource.org/licenses/MIT
 *
 * Converted to React by TuringLab <info@turinglab.com>
 */

import React from 'react'

class Scratchblock extends React.Component {

  className(classNames){
    classNames = classNames || [];
    return classNames.join(' ');
  }

  renderStack(script,classNames) {

    return (
      <div className={this.className(classNames)}>
        {script.map((item) => this.renderItem(item))}
      </div>
    )

  }


  renderItem(item) {

    if (['cwrap','cmouth'].includes(item.type)) {
      let classNames = [item.type,item.category];
      if (item.shape === 'cap') classNames.push(item.shape);
      return this.renderStack(item.contents,classNames);
    }
    
    return this.renderBlock(item);

  }

  // renderComment(item) {
  //   return item.comment;
  //   var $comment = $(document.createElement("div")).addClass("comment")
  //       .append($(document.createElement("div"))
  //       .append(document.createTextNode(item.comment.trim() || " ")));
  //   if (item.shape) {
  //     $comment.addClass("attached");
  //     $comment.addClass("to-" + item.shape);
  //   }
  //   return $comment;
  // }

  renderBlock(item) {
    if (!item) return;

    // Create list of class names
    let classNames = [item.shape,item.category];
    if (item.flag) classNames.push(item.flag);

    // color insert?
    if (item.shape === "color") {
      const style = {
        backgroundColor: item.pieces[0]
      };
      return <div className={this.className(classNames)} style={style}></div>
    }

    if (!item.pieces.length && item.flag !== "cend") {
      item.pieces = [];
      classNames.push("empty");
    }

    // Create block
    let block = (
      <div className={this.className(classNames)}>
        {item.pieces.map((piece) => {
          if (typeof piece === "object") {
            return this.renderBlock(piece);
          } else if (piece === "@" && item.imageReplacement) {
            return (
              <span className={item.imageReplacement}>
                <span>{imageText[item.imageReplacement]}</span>
              </span>
            )
          } else if (/^[▶◀▸◂+]$/.test(piece)) {
            return (
              <span className="arrow">
                <span>
                  {piece}
                </span>
              </span>
            )
          } else {
            if (!piece) piece = " ";
            return <span>{piece}</span>
          }
        })}
      </div>
    )


    // ringify?
    if (item.isRinged) {
      return (
        <div className={this.className(["ring-inner",item.shape])}>
          {block}
        </div>
      )
    }

    return block;
  }

  render() {
    return this.renderStack(this.props.script);
  }

}


export default Scratchblock