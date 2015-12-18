/**
 * @copyright 2015, TuringLab <info@turinglab.com>
 */

import React from 'react'
import sb2 from './scratchblocks2'

class Scratchblocks extends React.Component {


    constructor() {
        super();
        this.sb2 = new sb2();
    }


    parse(selector, options) {
        selector = selector || "pre.blocks";
        options = options || {
            inline: false,
        }

        // find elements
        $(selector).each(function (i, el) {
            var $el = $(el),
                $container = $('<div>'),
                code,
                scripts,
                html = $el.html();

            html = html.replace(/<br>\s?|\n|\r\n|\r/ig, '\n');
            code = $('<pre>' + html + '</pre>').text();
            if (options.inline) {
                code = code.replace('\n', '');
            }

            var scripts = this.sb2.parse_scripts(code);

            $el.text("");
            $el.append($container);
            $container.addClass("sb2");
            if (options.inline) {
                $container.addClass("inline-block");
            }
            for (var i=0; i<scripts.length; i++) {
                var $script = render_stack(scripts[i]).addClass("script");
                $container.append($script);
            }
        });
    };

    render_stack(script) {
        var $script = $(document.createElement("div"));
        for (var i=0; i<script.length; i++) {
            var info = script[i];
            $script.append(render_stack_item(info));
            if (info.comment !== undefined) {
                $script.append(render_comment(info));
            }
        }
        return $script;
    }


    render_stack_item(info) {
        switch (info.type) {
            case "cwrap":
                var $cwrap = this.render_stack(info.contents).addClass("cwrap")
                                .addClass(info.category);
                if (info.shape === "cap") $cwrap.addClass(info.shape)
                return $cwrap;

            case "cmouth":
                return this.render_stack(info.contents).addClass("cmouth")
                                .addClass(info.category);

            default:
                return this.render_block(info);
        }
    }

    render_comment(info) {
        var $comment = $(document.createElement("div")).addClass("comment")
                .append($(document.createElement("div"))
                .append(document.createTextNode(info.comment.trim() || " ")));
        if (info.shape) {
            $comment.addClass("attached");
            $comment.addClass("to-" + info.shape);
        }
        return $comment;
    }

    render_block(info) {
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
        if (info.is_ringed) {
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
                $block.append(render_block(piece));
            } else if (piece === "@" && info.image_replacement) {
                var $image = $("<span>")
                $image.addClass(info.image_replacement);
                var $span = $("<span>")
                $span.text(image_text[info.image_replacement]);
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
        console.log(this.sb2.parse_scripts('repeat 10\n\tsay [Hello]'))
        return <div>Hello Friend</div>
    }

}

export default Scratchblocks