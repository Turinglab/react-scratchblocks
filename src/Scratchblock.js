/**
 * @copyright 2015, TuringLab <info@turinglab.com>
 */

import React from 'react'

class Scratchblock extends React.Component {

    renderStack(script) {
        var $script = $(document.createElement("div"));
        for (var i=0; i<script.length; i++) {
            var info = script[i];
            $script.append(renderStackItem(info));
            if (info.comment !== undefined) {
                $script.append(renderComment(info));
            }
        }
        return $script;
    }


    renderStackItem(info) {
        switch (info.type) {
            case "cwrap":
                var $cwrap = this.renderStack(info.contents).addClass("cwrap")
                                .addClass(info.category);
                if (info.shape === "cap") $cwrap.addClass(info.shape)
                return $cwrap;

            case "cmouth":
                return this.renderStack(info.contents).addClass("cmouth")
                                .addClass(info.category);

            default:
                return this.renderBlock(info);
        }
    }

    renderComment(info) {
        var $comment = $(document.createElement("div")).addClass("comment")
                .append($(document.createElement("div"))
                .append(document.createTextNode(info.comment.trim() || " ")));
        if (info.shape) {
            $comment.addClass("attached");
            $comment.addClass("to-" + info.shape);
        }
        return $comment;
    }

    renderBlock(info) {
        if (!info) return;

        // make DOM element
        var $block = $(document.createElement("div"));
        $block.addClass(info.shape);
        $block.addClass(info.category);
        if (info.flag) $block.addClass(info.flag);

        // color insert?
        if (info.shape === "color") {
            $block.css({"background-color": info.pieces[0]});
            $block.text(" ");
            return $block;
        }

        // ringify?
        var $ring;
        if (info.isRinged) {
            $ring = $(document.createElement("div")).addClass("ring-inner")
                               .addClass(info.shape).append($block);
        }
        if (info.flag === "ring") {
            $block.addClass("ring");
        }

        // empty?
        if (!info.pieces.length && info.flag !== "cend") {
            $block.addClass("empty");
            return $ring || $block;
        }

        // output text segments & args
        for (var i=0; i<info.pieces.length; i++) {
            var piece = info.pieces[i];
            if (typeof piece === "object") {
                $block.append(renderBlock(piece));
            } else if (piece === "@" && info.imageReplacement) {
                var $image = $("<span>")
                $image.addClass(info.imageReplacement);
                var $span = $("<span>")
                $span.text(imageText[info.imageReplacement]);
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