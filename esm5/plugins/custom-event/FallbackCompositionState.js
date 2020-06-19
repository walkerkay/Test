/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * These variables store information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 *
 */
var root = null;
var startText = null;
var fallbackText = null;
export function initialize(nativeEventTarget) {
    root = nativeEventTarget;
    startText = getText();
    return true;
}
export function reset() {
    root = null;
    startText = null;
    fallbackText = null;
}
export function getData() {
    if (fallbackText) {
        return fallbackText;
    }
    var start;
    var startValue = startText;
    var startLength = startValue.length;
    var end;
    var endValue = getText();
    var endLength = endValue.length;
    for (start = 0; start < startLength; start++) {
        if (startValue[start] !== endValue[start]) {
            break;
        }
    }
    var minEnd = startLength - start;
    for (end = 1; end <= minEnd; end++) {
        if (startValue[startLength - end] !== endValue[endLength - end]) {
            break;
        }
    }
    var sliceTail = end > 1 ? 1 - end : undefined;
    fallbackText = endValue.slice(start, sliceTail);
    return fallbackText;
}
export function getText() {
    if ('value' in root) {
        return root.value;
    }
    return root.textContent;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmFsbGJhY2tDb21wb3NpdGlvblN0YXRlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1zbGF0ZS9jb3JlLyIsInNvdXJjZXMiOlsicGx1Z2lucy9jdXN0b20tZXZlbnQvRmFsbGJhY2tDb21wb3NpdGlvblN0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHO0FBRUg7Ozs7Ozs7Ozs7R0FVRztBQUVILElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDckIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBRXhCLE1BQU0sVUFBVSxVQUFVLENBQUMsaUJBQWlCO0lBQ3hDLElBQUksR0FBRyxpQkFBaUIsQ0FBQztJQUN6QixTQUFTLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFDdEIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVELE1BQU0sVUFBVSxLQUFLO0lBQ2pCLElBQUksR0FBRyxJQUFJLENBQUM7SUFDWixTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDeEIsQ0FBQztBQUVELE1BQU0sVUFBVSxPQUFPO0lBQ25CLElBQUksWUFBWSxFQUFFO1FBQ2QsT0FBTyxZQUFZLENBQUM7S0FDdkI7SUFFRCxJQUFJLEtBQUssQ0FBQztJQUNWLElBQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUM3QixJQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3RDLElBQUksR0FBRyxDQUFDO0lBQ1IsSUFBTSxRQUFRLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFDM0IsSUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUVsQyxLQUFLLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLFdBQVcsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUMxQyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkMsTUFBTTtTQUNUO0tBQ0o7SUFFRCxJQUFNLE1BQU0sR0FBRyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQ25DLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ2hDLElBQUksVUFBVSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUMsS0FBSyxRQUFRLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxFQUFFO1lBQzdELE1BQU07U0FDVDtLQUNKO0lBRUQsSUFBTSxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2hELFlBQVksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNoRCxPQUFPLFlBQVksQ0FBQztBQUN4QixDQUFDO0FBRUQsTUFBTSxVQUFVLE9BQU87SUFDbkIsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNyQjtJQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUM1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vKipcbiAqIFRoZXNlIHZhcmlhYmxlcyBzdG9yZSBpbmZvcm1hdGlvbiBhYm91dCB0ZXh0IGNvbnRlbnQgb2YgYSB0YXJnZXQgbm9kZSxcbiAqIGFsbG93aW5nIGNvbXBhcmlzb24gb2YgY29udGVudCBiZWZvcmUgYW5kIGFmdGVyIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogSWRlbnRpZnkgdGhlIG5vZGUgd2hlcmUgc2VsZWN0aW9uIGN1cnJlbnRseSBiZWdpbnMsIHRoZW4gb2JzZXJ2ZVxuICogYm90aCBpdHMgdGV4dCBjb250ZW50IGFuZCBpdHMgY3VycmVudCBwb3NpdGlvbiBpbiB0aGUgRE9NLiBTaW5jZSB0aGVcbiAqIGJyb3dzZXIgbWF5IG5hdGl2ZWx5IHJlcGxhY2UgdGhlIHRhcmdldCBub2RlIGR1cmluZyBjb21wb3NpdGlvbiwgd2UgY2FuXG4gKiB1c2UgaXRzIHBvc2l0aW9uIHRvIGZpbmQgaXRzIHJlcGxhY2VtZW50LlxuICpcbiAqXG4gKi9cblxubGV0IHJvb3QgPSBudWxsO1xubGV0IHN0YXJ0VGV4dCA9IG51bGw7XG5sZXQgZmFsbGJhY2tUZXh0ID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUobmF0aXZlRXZlbnRUYXJnZXQpIHtcbiAgICByb290ID0gbmF0aXZlRXZlbnRUYXJnZXQ7XG4gICAgc3RhcnRUZXh0ID0gZ2V0VGV4dCgpO1xuICAgIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgcm9vdCA9IG51bGw7XG4gICAgc3RhcnRUZXh0ID0gbnVsbDtcbiAgICBmYWxsYmFja1RleHQgPSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YSgpIHtcbiAgICBpZiAoZmFsbGJhY2tUZXh0KSB7XG4gICAgICAgIHJldHVybiBmYWxsYmFja1RleHQ7XG4gICAgfVxuXG4gICAgbGV0IHN0YXJ0O1xuICAgIGNvbnN0IHN0YXJ0VmFsdWUgPSBzdGFydFRleHQ7XG4gICAgY29uc3Qgc3RhcnRMZW5ndGggPSBzdGFydFZhbHVlLmxlbmd0aDtcbiAgICBsZXQgZW5kO1xuICAgIGNvbnN0IGVuZFZhbHVlID0gZ2V0VGV4dCgpO1xuICAgIGNvbnN0IGVuZExlbmd0aCA9IGVuZFZhbHVlLmxlbmd0aDtcblxuICAgIGZvciAoc3RhcnQgPSAwOyBzdGFydCA8IHN0YXJ0TGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICAgIGlmIChzdGFydFZhbHVlW3N0YXJ0XSAhPT0gZW5kVmFsdWVbc3RhcnRdKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1pbkVuZCA9IHN0YXJ0TGVuZ3RoIC0gc3RhcnQ7XG4gICAgZm9yIChlbmQgPSAxOyBlbmQgPD0gbWluRW5kOyBlbmQrKykge1xuICAgICAgICBpZiAoc3RhcnRWYWx1ZVtzdGFydExlbmd0aCAtIGVuZF0gIT09IGVuZFZhbHVlW2VuZExlbmd0aCAtIGVuZF0pIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2xpY2VUYWlsID0gZW5kID4gMSA/IDEgLSBlbmQgOiB1bmRlZmluZWQ7XG4gICAgZmFsbGJhY2tUZXh0ID0gZW5kVmFsdWUuc2xpY2Uoc3RhcnQsIHNsaWNlVGFpbCk7XG4gICAgcmV0dXJuIGZhbGxiYWNrVGV4dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRleHQoKSB7XG4gICAgaWYgKCd2YWx1ZScgaW4gcm9vdCkge1xuICAgICAgICByZXR1cm4gcm9vdC52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJvb3QudGV4dENvbnRlbnQ7XG59XG4iXX0=