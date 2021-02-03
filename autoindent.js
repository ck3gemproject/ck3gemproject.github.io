/**
 * http://jsfiddle.net/rudiedirkx/WwCe3/
 *
 * To do:
 * - tab/shift tab: (un)indent a line on command
 * - 'mass tab': select several lines and (un)indent them all (requires TAB)
 * - support for undo/redo, by using `execCommand('insertText')`
 */

function doAutoIndent(ta, indent) {
    indent || (indent = "\xa0\xa0");

    function setValue(text) {
        ta.value = text;
        return ta.value;
    }

    function str_repeat(str, n) {
        var out = '';
        while (n--) out += str;
        return out;
    }

    function isIndented(line) {
        var regex = new RegExp('^(' + indent + '+)', 'g'),
            match = line.match(regex);
        return match && match[0].length / indent.length || 0;
    }

    function addIndent(before, after, num) {
        // num = num ? ~~num : 1;
        if ( !num ) return;
        ta._lastValue = setValue(before + str_repeat(indent, num) + after);
        ta.selectionStart = ta.selectionEnd = before.length + indent.length * num;
    }

    function removeIndent(before, after) {
        var remove = before.slice(before.length - 1 - indent.length, before.length - 1);
        if ( remove != indent ) {
            return;
        }

        ta._lastValue = setValue(before.slice(0, -1-indent.length) + '}' + after);
        ta.selectionStart = ta.selectionEnd = before.length - indent.length;
    }

    function getPrevLine(before) {
        var lines = ta.value.split(/\n/g),
            line = before.trimRight().split(/\n/g).length - 1;
        return lines[line] || '';
    }

    function onKeyUp(e) {
        var lastValue = ta._lastValue === undefined ? ta.defaultValue : ta._lastValue,
            change = ta.value.length - lastValue.length;
        ta._lastValue = ta.value;
        if ( !change ) {
            return;
        }

        var caret = ta.selectionStart,
            added = change > 0 && ta.value.substr(caret - change, change) || '',
            removed = change < 0 && lastValue.substr(caret, -change) || '';

        var code = e.keyCode;
        var value = ta.value,
            before = value.substr(0, caret),
            after = value.substr(caret),
            lastChar = before.trim().slice(-1),
            nextChar = after.substr(0, 1);

        // ENTER
        if ( code == 13 ) {
            // Immediately after a {
            if ( lastChar == '{' ) {
                var prevLine = getPrevLine(before),
                    indents = isIndented(prevLine),
                    more = nextChar == '}' ? 0 : 1;
                return addIndent(before, after, indents + more);
            }

            // After an indented line
            var prevLine = getPrevLine(before),
                indents = isIndented(prevLine),
                more = nextChar == '}' ? -1 : 0;
            if ( indents + more > 0 ) {
                addIndent(before, after, indents + more);
            }
        }
        else if ( added == '}' ) {
            removeIndent(before, after);
        }
    }

    ta.addEventListener('keyup', onKeyUp, false);
}

var tas = document.querySelectorAll('textarea');
[].forEach.call(tas, function(ta) {
    doAutoIndent(ta, "\xa0\xa0");
});

var preText = document.querySelectorAll('pre');
[].forEach.call(preText, function(ta) {
    doAutoIndent(ta, "\xa0\xa0");
});
