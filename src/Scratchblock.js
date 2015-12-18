/**
 * Original Copyright 2013, Tim Radvan
 * @license MIT
 * http://opensource.org/licenses/MIT
 *
 * Converted to React by TuringLab <info@turinglab.com>
 */

import React from 'react'

class Scratchblock extends React.Component {

  renderStack(script,classNames) {

    classNames = classNames || [];
    const className = classNames.join(' ');

    return (
      <div className={className}>
        {script.map((item) => renderItem(item))}
      </div>
    )

    // var $script = $(document.createElement("div"));
    // for (var i=0; i<script.length; i++) {
    //   var item = script[i];
    //   $script.append(renderItem(item));
    //   if (item.comment !== undefined) {
    //     $script.append(renderComment(item));
    //   }
    // }
    // return $script;
  }


  renderItem(item) {

    if (['cwrap','cmouth'].includes(item.type) == 'cwrap') {
      let classNames = [item.type,item.category];
      if (item.shape === 'cap') classNames.push(item.shape);
      return this.renderStack(item.contents,classNames);
    }
    
    return this.renderBlock(item);


    // switch (item.type) {
    //   case "cwrap":
    //     var $cwrap = this.renderStack(item.contents).addClass("cwrap")
    //             .addClass(item.category);
    //     if (item.shape === "cap") $cwrap.addClass(item.shape)
    //     return $cwrap;

    //   case "cmouth":
    //     return this.renderStack(item.contents).addClass("cmouth")
    //             .addClass(item.category);

    //   default:
    //     return this.renderBlock(item);
    // }
  }

  // TODO CONVERT COMMENT
  renderComment(item) {
    var $comment = $(document.createElement("div")).addClass("comment")
        .append($(document.createElement("div"))
        .append(document.createTextNode(item.comment.trim() || " ")));
    if (item.shape) {
      $comment.addClass("attached");
      $comment.addClass("to-" + item.shape);
    }
    return $comment;
  }

  renderBlock(item) {
    if (!item) return;

    // make DOM element
    var $block = $(document.createElement("div"));
    $block.addClass(item.shape);
    $block.addClass(item.category);
    if (item.flag) $block.addClass(item.flag);

    // color insert?
    if (item.shape === "color") {
      $block.css({"background-color": item.pieces[0]});
      $block.text(" ");
      return $block;
    }

    // ringify?
    var $ring;
    if (item.isRinged) {
      $ring = $(document.createElement("div")).addClass("ring-inner")
                 .addClass(item.shape).append($block);
    }
    if (item.flag === "ring") {
      $block.addClass("ring");
    }

    // empty?
    if (!item.pieces.length && item.flag !== "cend") {
      $block.addClass("empty");
      return $ring || $block;
    }

    // output text segments & args
    for (var i=0; i<item.pieces.length; i++) {
      var piece = item.pieces[i];
      if (typeof piece === "object") {
        $block.append(renderBlock(piece));
      } else if (piece === "@" && item.imageReplacement) {
        var $image = $("<span>")
        $image.addClass(item.imageReplacement);
        var $span = $("<span>")
        $span.text(imageText[item.imageReplacement]);
        $image.append($span);
        $block.append($image);
      } else if (/^[▶◀▸◂+]$/.test(piece)) {
        $block.append(
          $(document.createElement("span")).addClass("arrow")
            .append(document.createTextNode(piece)));
      } else {
        if (!piece) piece = " ";
        $block.append(document.createTextNode(piece));
      }
    }

    return $ring || $block;
  }

  render() {
    const block = this.props.block;
    console.log(block);
    return (
      <div className="script">{block.toString()}</div>
    );
  }

}


export default Scratchblock