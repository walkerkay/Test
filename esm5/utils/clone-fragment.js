import Base64 from 'slate-base64-serializer';
import Plain from 'slate-plain-serializer';
import getWindow from 'get-window';
import { IS_IE } from 'slate-dev-environment';
import { Value } from 'slate';
import TRANSFER_TYPES from '../constants/transfer-types';
import removeAllRanges from './remove-all-ranges';
import DATA_ATTRS from '../constants/data-attributes';
import SELECTORS from '../constants/selectors';
var FRAGMENT = TRANSFER_TYPES.FRAGMENT, HTML = TRANSFER_TYPES.HTML, TEXT = TRANSFER_TYPES.TEXT;
function cloneFragment(event, editor, callback) {
    if (callback === void 0) { callback = function () { return undefined; }; }
    var window = getWindow(event.target);
    var native = window.getSelection();
    var value = editor.value;
    var document = value.document, fragment = value.fragment, selection = value.selection;
    var start = selection.start, end = selection.end;
    var startVoid = document.getClosestVoid(start.path, editor);
    var endVoid = document.getClosestVoid(end.path, editor);
    // If the selection is collapsed, and it isn't inside a void node, abort.
    if (native.isCollapsed && !startVoid) {
        return;
    }
    // Create a fake selection so that we can add a Base64-encoded copy of the
    // fragment to the HTML, to decode on future pastes.
    var encoded = Base64.serializeNode(fragment);
    var range = native.getRangeAt(0);
    var contents = range.cloneContents();
    var attach = contents.childNodes[0];
    // Make sure attach is a non-empty node, since empty nodes will not get copied
    contents.childNodes.forEach(function (node) {
        if (node.textContent && node.textContent.trim() !== '') {
            attach = node;
        }
    });
    // COMPAT: If the end node is a void node, we need to move the end of the
    // range from the void node's spacer span, to the end of the void node's
    // content, since the spacer is before void's content in the DOM.
    if (endVoid) {
        var r = range.cloneRange();
        var node = editor.findDOMNode(document.getPath(endVoid));
        r.setEndAfter(node);
        contents = r.cloneContents();
    }
    // COMPAT: If the start node is a void node, we need to attach the encoded
    // fragment to the void node's content node instead of the spacer, because
    // attaching it to empty `<div>/<span>` nodes will end up having it erased by
    // most browsers. (2018/04/27)
    if (startVoid) {
        attach = contents.childNodes[0].childNodes[1].firstChild;
    }
    // Remove any zero-width space spans from the cloned DOM so that they don't
    // show up elsewhere when pasted.
    [].slice.call(contents.querySelectorAll(SELECTORS.ZERO_WIDTH)).forEach(function (zw) {
        var isNewline = zw.getAttribute(DATA_ATTRS.ZERO_WIDTH) === 'n';
        zw.textContent = isNewline ? '\n' : '';
    });
    // Set a `data-slate-fragment` attribute on a non-empty node, so it shows up
    // in the HTML, and can be used for intra-Slate pasting. If it's a text
    // node, wrap it in a `<span>` so we have something to set an attribute on.
    if (attach.nodeType === 3) {
        var span = window.document.createElement('span');
        // COMPAT: In Chrome and Safari, if we don't add the `white-space` style
        // then leading and trailing spaces will be ignored. (2017/09/21)
        span.style.whiteSpace = 'pre';
        span.appendChild(attach);
        contents.appendChild(span);
        attach = span;
    }
    attach.setAttribute(DATA_ATTRS.FRAGMENT, encoded);
    //  Creates value from only the selected blocks
    //  Then gets plaintext for clipboard with proper linebreaks for BLOCK elements
    //  Via Plain serializer
    var valFromSelection = Value.create({ document: fragment });
    var plainText = Plain.serialize(valFromSelection);
    // Add the phony content to a div element. This is needed to copy the
    // contents into the html clipboard register.
    var div = window.document.createElement('div');
    div.appendChild(contents);
    // For browsers supporting it, we set the clipboard registers manually,
    // since the result is more predictable.
    // COMPAT: IE supports the setData method, but only in restricted sense.
    // IE doesn't support arbitrary MIME types or common ones like 'text/plain';
    // it only accepts "Text" (which gets mapped to 'text/plain') and "Url"
    // (mapped to 'text/url-list'); so, we should only enter block if !IS_IE
    if (event.clipboardData && event.clipboardData.setData && !IS_IE) {
        event.preventDefault();
        event.clipboardData.setData(TEXT, plainText);
        event.clipboardData.setData(FRAGMENT, encoded);
        event.clipboardData.setData(HTML, div.innerHTML);
        callback();
        return;
    }
    // COMPAT: For browser that don't support the Clipboard API's setData method,
    // we must rely on the browser to natively copy what's selected.
    // So we add the div (containing our content) to the DOM, and select it.
    var editorEl = event.target.closest(SELECTORS.EDITOR);
    div.setAttribute('contenteditable', true);
    div.style.position = 'absolute';
    div.style.left = '-9999px';
    editorEl.appendChild(div);
    native.selectAllChildren(div);
    // Revert to the previous selection right after copying.
    window.requestAnimationFrame(function () {
        editorEl.removeChild(div);
        removeAllRanges(native);
        native.addRange(range);
        callback();
    });
}
export default cloneFragment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvbmUtZnJhZ21lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmd4LXNsYXRlL2NvcmUvIiwic291cmNlcyI6WyJ1dGlscy9jbG9uZS1mcmFnbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSx5QkFBeUIsQ0FBQztBQUM3QyxPQUFPLEtBQUssTUFBTSx3QkFBd0IsQ0FBQztBQUMzQyxPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFOUIsT0FBTyxjQUFjLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxlQUFlLE1BQU0scUJBQXFCLENBQUM7QUFFbEQsT0FBTyxVQUFVLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxTQUFTLE1BQU0sd0JBQXdCLENBQUM7QUFFdkMsSUFBQSxrQ0FBUSxFQUFFLDBCQUFJLEVBQUUsMEJBQUksQ0FBb0I7QUFFaEQsU0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUEwQjtJQUExQix5QkFBQSxFQUFBLHlCQUFpQixPQUFBLFNBQVMsRUFBVCxDQUFTO0lBRTVELElBQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdCLElBQUEsb0JBQUssQ0FBWTtJQUNqQixJQUFBLHlCQUFRLEVBQUUseUJBQVEsRUFBRSwyQkFBUyxDQUFXO0lBQ3hDLElBQUEsdUJBQUssRUFBRSxtQkFBRyxDQUFlO0lBQ2pDLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5RCxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxD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LE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU5Qix3REFBd0Q7SUFDeEQsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQ3pCLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsUUFBUSxFQUFFLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlNjQgZnJvbSAnc2xhdGUtYmFzZTY0LXNlcmlhbGl6ZXInO1xuaW1wb3J0IFBsYWluIGZyb20gJ3NsYXRlLXBsYWluLXNlcmlhbGl6ZXInO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tICdnZXQtd2luZG93JztcbmltcG9ydCB7IElTX0lFIH0gZnJvbSAnc2xhdGUtZGV2LWVudmlyb25tZW50JztcbmltcG9ydCB7IFZhbHVlIH0gZnJvbSAnc2xhdGUnO1xuXG5pbXBvcnQgVFJBTlNGRVJfVFlQRVMgZnJvbSAnLi4vY29uc3RhbnRzL3RyYW5zZmVyLXR5cGVzJztcbmltcG9ydCByZW1vdmVBbGxSYW5nZXMgZnJvbSAnLi9yZW1vdmUtYWxsLXJhbmdlcyc7XG5pbXBvcnQgZmluZERPTU5vZGUgZnJvbSAnLi9maW5kLWRvbS1ub2RlJztcbmltcG9ydCBEQVRBX0FUVFJTIGZyb20gJy4uL2NvbnN0YW50cy9kYXRhLWF0dHJpYnV0ZXMnO1xuaW1wb3J0IFNFTEVDVE9SUyBmcm9tICcuLi9jb25zdGFudHMvc2VsZWN0b3JzJztcblxuY29uc3QgeyBGUkFHTUVOVCwgSFRNTCwgVEVYVCB9ID0gVFJBTlNGRVJfVFlQRVM7XG5cbmZ1bmN0aW9uIGNsb25lRnJhZ21lbnQoZXZlbnQsIGVkaXRvciwgY2FsbGJhY2sgPSAoKSA9PiB1bmRlZmluZWQpIHtcblxuICAgIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdyhldmVudC50YXJnZXQpO1xuICAgIGNvbnN0IG5hdGl2ZSA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSBlZGl0b3I7XG4gICAgY29uc3QgeyBkb2N1bWVudCwgZnJhZ21lbnQsIHNlbGVjdGlvbiB9ID0gdmFsdWU7XG4gICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSBzZWxlY3Rpb247XG4gICAgY29uc3Qgc3RhcnRWb2lkID0gZG9jdW1lbnQuZ2V0Q2xvc2VzdFZvaWQoc3RhcnQucGF0aCwgZWRpdG9yKTtcbiAgICBjb25zdCBlbmRWb2lkID0gZG9jdW1lbnQuZ2V0Q2xvc2VzdFZvaWQoZW5kLnBhdGgsIGVkaXRvcik7XG5cbiAgICAvLyBJZiB0aGUgc2VsZWN0aW9uIGlzIGNvbGxhcHNlZCwgYW5kIGl0IGlzbid0IGluc2lkZSBhIHZvaWQgbm9kZSwgYWJvcnQuXG4gICAgaWYgKG5hdGl2ZS5pc0NvbGxhcHNlZCAmJiAhc3RhcnRWb2lkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgYSBmYWtlIHNlbGVjdGlvbiBzbyB0aGF0IHdlIGNhbiBhZGQgYSBCYXNlNjQtZW5jb2RlZCBjb3B5IG9mIHRoZVxuICAgIC8vIGZyYWdtZW50IHRvIHRoZSBIVE1MLCB0byBkZWNvZGUgb24gZnV0dXJlIHBhc3Rlcy5cbiAgICBjb25zdCBlbmNvZGVkID0gQmFzZTY0LnNlcmlhbGl6ZU5vZGUoZnJhZ21lbnQpO1xuICAgIGNvbnN0IHJhbmdlID0gbmF0aXZlLmdldFJhbmdlQXQoMCk7XG4gICAgbGV0IGNvbnRlbnRzID0gcmFuZ2UuY2xvbmVDb250ZW50cygpO1xuICAgIGxldCBhdHRhY2ggPSBjb250ZW50cy5jaGlsZE5vZGVzWzBdO1xuXG4gICAgLy8gTWFrZSBzdXJlIGF0dGFjaCBpcyBhIG5vbi1lbXB0eSBub2RlLCBzaW5jZSBlbXB0eSBub2RlcyB3aWxsIG5vdCBnZXQgY29waWVkXG4gICAgY29udGVudHMuY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBpZiAobm9kZS50ZXh0Q29udGVudCAmJiBub2RlLnRleHRDb250ZW50LnRyaW0oKSAhPT0gJycpIHtcbiAgICAgICAgICAgIGF0dGFjaCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENPTVBBVDogSWYgdGhlIGVuZCBub2RlIGlzIGEgdm9pZCBub2RlLCB3ZSBuZWVkIHRvIG1vdmUgdGhlIGVuZCBvZiB0aGVcbiAgICAvLyByYW5nZSBmcm9tIHRoZSB2b2lkIG5vZGUncyBzcGFjZXIgc3BhbiwgdG8gdGhlIGVuZCBvZiB0aGUgdm9pZCBub2RlJ3NcbiAgICAvLyBjb250ZW50LCBzaW5jZSB0aGUgc3BhY2VyIGlzIGJlZm9yZSB2b2lkJ3MgY29udGVudCBpbiB0aGUgRE9NLlxuICAgIGlmIChlbmRWb2lkKSB7XG4gICAgICAgIGNvbnN0IHIgPSByYW5nZS5jbG9uZVJhbmdlKCk7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBlZGl0b3IuZmluZERPTU5vZGUoZG9jdW1lbnQuZ2V0UGF0aChlbmRWb2lkKSk7XG4gICAgICAgIHIuc2V0RW5kQWZ0ZXIobm9kZSk7XG4gICAgICAgIGNvbnRlbnRzID0gci5jbG9uZUNvbnRlbnRzKCk7XG4gICAgfVxuXG4gICAgLy8gQ09NUEFUOiBJZiB0aGUgc3RhcnQgbm9kZSBpcyBhIHZvaWQgbm9kZSwgd2UgbmVlZCB0byBhdHRhY2ggdGhlIGVuY29kZWRcbiAgICAvLyBmcmFnbWVudCB0byB0aGUgdm9pZCBub2RlJ3MgY29udGVudCBub2RlIGluc3RlYWQgb2YgdGhlIHNwYWNlciwgYmVjYXVzZVxuICAgIC8vIGF0dGFjaGluZyBpdCB0byBlbXB0eSBgPGRpdj4vPHNwYW4+YCBub2RlcyB3aWxsIGVuZCB1cCBoYXZpbmcgaXQgZXJhc2VkIGJ5XG4gICAgLy8gbW9zdCBicm93c2Vycy4gKDIwMTgvMDQvMjcpXG4gICAgaWYgKHN0YXJ0Vm9pZCkge1xuICAgICAgICBhdHRhY2ggPSBjb250ZW50cy5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMV0uZmlyc3RDaGlsZDtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYW55IHplcm8td2lkdGggc3BhY2Ugc3BhbnMgZnJvbSB0aGUgY2xvbmVkIERPTSBzbyB0aGF0IHRoZXkgZG9uJ3RcbiAgICAvLyBzaG93IHVwIGVsc2V3aGVyZSB3aGVuIHBhc3RlZC5cbiAgICBbXS5zbGljZS5jYWxsKGNvbnRlbnRzLnF1ZXJ5U2VsZWN0b3JBbGwoU0VMRUNUT1JTLlpFUk9fV0lEVEgpKS5mb3JFYWNoKHp3ID0+IHtcbiAgICAgICAgY29uc3QgaXNOZXdsaW5lID0gencuZ2V0QXR0cmlidXRlKERBVEFfQVRUUlMuWkVST19XSURUSCkgPT09ICduJztcbiAgICAgICAgencudGV4dENvbnRlbnQgPSBpc05ld2xpbmUgPyAnXFxuJyA6ICcnO1xuICAgIH0pO1xuXG4gICAgLy8gU2V0IGEgYGRhdGEtc2xhdGUtZnJhZ21lbnRgIGF0dHJpYnV0ZSBvbiBhIG5vbi1lbXB0eSBub2RlLCBzbyBpdCBzaG93cyB1cFxuICAgIC8vIGluIHRoZSBIVE1MLCBhbmQgY2FuIGJlIHVzZWQgZm9yIGludHJhLVNsYXRlIHBhc3RpbmcuIElmIGl0J3MgYSB0ZXh0XG4gICAgLy8gbm9kZSwgd3JhcCBpdCBpbiBhIGA8c3Bhbj5gIHNvIHdlIGhhdmUgc29tZXRoaW5nIHRvIHNldCBhbiBhdHRyaWJ1dGUgb24uXG4gICAgaWYgKGF0dGFjaC5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICBjb25zdCBzcGFuID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAvLyBDT01QQVQ6IEluIENocm9tZSBhbmQgU2FmYXJpLCBpZiB3ZSBkb24ndCBhZGQgdGhlIGB3aGl0ZS1zcGFjZWAgc3R5bGVcbiAgICAgICAgLy8gdGhlbiBsZWFkaW5nIGFuZCB0cmFpbGluZyBzcGFjZXMgd2lsbCBiZSBpZ25vcmVkLiAoMjAxNy8wOS8yMSlcbiAgICAgICAgc3Bhbi5zdHlsZS53aGl0ZVNwYWNlID0gJ3ByZSc7XG5cbiAgICAgICAgc3Bhbi5hcHBlbmRDaGlsZChhdHRhY2gpO1xuICAgICAgICBjb250ZW50cy5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgICAgYXR0YWNoID0gc3BhbjtcbiAgICB9XG5cbiAgICBhdHRhY2guc2V0QXR0cmlidXRlKERBVEFfQVRUUlMuRlJBR01FTlQsIGVuY29kZWQpO1xuXG4gICAgLy8gIENyZWF0ZXMgdmFsdWUgZnJvbSBvbmx5IHRoZSBzZWxlY3RlZCBibG9ja3NcbiAgICAvLyAgVGhlbiBnZXRzIHBsYWludGV4dCBmb3IgY2xpcGJvYXJkIHdpdGggcHJvcGVyIGxpbmVicmVha3MgZm9yIEJMT0NLIGVsZW1lbnRzXG4gICAgLy8gIFZpYSBQbGFpbiBzZXJpYWxpemVyXG4gICAgY29uc3QgdmFsRnJvbVNlbGVjdGlvbiA9IFZhbHVlLmNyZWF0ZSh7IGRvY3VtZW50OiBmcmFnbWVudCB9KTtcbiAgICBjb25zdCBwbGFpblRleHQgPSBQbGFpbi5zZXJpYWxpemUodmFsRnJvbVNlbGVjdGlvbik7XG5cbiAgICAvLyBBZGQgdGhlIHBob255IGNvbnRlbnQgdG8gYSBkaXYgZWxlbWVudC4gVGhpcyBpcyBuZWVkZWQgdG8gY29weSB0aGVcbiAgICAvLyBjb250ZW50cyBpbnRvIHRoZSBodG1sIGNsaXBib2FyZCByZWdpc3Rlci5cbiAgICBjb25zdCBkaXYgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmFwcGVuZENoaWxkKGNvbnRlbnRzKTtcblxuICAgIC8vIEZvciBicm93c2VycyBzdXBwb3J0aW5nIGl0LCB3ZSBzZXQgdGhlIGNsaXBib2FyZCByZWdpc3RlcnMgbWFudWFsbHksXG4gICAgLy8gc2luY2UgdGhlIHJlc3VsdCBpcyBtb3JlIHByZWRpY3RhYmxlLlxuICAgIC8vIENPTVBBVDogSUUgc3VwcG9ydHMgdGhlIHNldERhdGEgbWV0aG9kLCBidXQgb25seSBpbiByZXN0cmljdGVkIHNlbnNlLlxuICAgIC8vIElFIGRvZXNuJ3Qgc3VwcG9ydCBhcmJpdHJhcnkgTUlNRSB0eXBlcyBvciBjb21tb24gb25lcyBsaWtlICd0ZXh0L3BsYWluJztcbiAgICAvLyBpdCBvbmx5IGFjY2VwdHMgXCJUZXh0XCIgKHdoaWNoIGdldHMgbWFwcGVkIHRvICd0ZXh0L3BsYWluJykgYW5kIFwiVXJsXCJcbiAgICAvLyAobWFwcGVkIHRvICd0ZXh0L3VybC1saXN0Jyk7IHNvLCB3ZSBzaG91bGQgb25seSBlbnRlciBibG9jayBpZiAhSVNfSUVcbiAgICBpZiAoZXZlbnQuY2xpcGJvYXJkRGF0YSAmJiBldmVudC5jbGlwYm9hcmREYXRhLnNldERhdGEgJiYgIUlTX0lFKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LmNsaXBib2FyZERhdGEuc2V0RGF0YShURVhULCBwbGFpblRleHQpO1xuICAgICAgICBldmVudC5jbGlwYm9hcmREYXRhLnNldERhdGEoRlJBR01FTlQsIGVuY29kZWQpO1xuICAgICAgICBldmVudC5jbGlwYm9hcmREYXRhLnNldERhdGEoSFRNTCwgZGl2LmlubmVySFRNTCk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDT01QQVQ6IEZvciBicm93c2VyIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0aGUgQ2xpcGJvYXJkIEFQSSdzIHNldERhdGEgbWV0aG9kLFxuICAgIC8vIHdlIG11c3QgcmVseSBvbiB0aGUgYnJvd3NlciB0byBuYXRpdmVseSBjb3B5IHdoYXQncyBzZWxlY3RlZC5cbiAgICAvLyBTbyB3ZSBhZGQgdGhlIGRpdiAoY29udGFpbmluZyBvdXIgY29udGVudCkgdG8gdGhlIERPTSwgYW5kIHNlbGVjdCBpdC5cbiAgICBjb25zdCBlZGl0b3JFbCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFNFTEVDVE9SUy5FRElUT1IpO1xuICAgIGRpdi5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScsIHRydWUpO1xuICAgIGRpdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZGl2LnN0eWxlLmxlZnQgPSAnLTk5OTlweCc7XG4gICAgZWRpdG9yRWwuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICBuYXRpdmUuc2VsZWN0QWxsQ2hpbGRyZW4oZGl2KTtcblxuICAgIC8vIFJldmVydCB0byB0aGUgcHJldmlvdXMgc2VsZWN0aW9uIHJpZ2h0IGFmdGVyIGNvcHlpbmcuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGVkaXRvckVsLnJlbW92ZUNoaWxkKGRpdik7XG4gICAgICAgIHJlbW92ZUFsbFJhbmdlcyhuYXRpdmUpO1xuICAgICAgICBuYXRpdmUuYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbG9uZUZyYWdtZW50O1xuIl19