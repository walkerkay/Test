import EVENT_HANDLERS from '../../constants/event-handlers';
const PROPS = [
    ...EVENT_HANDLERS,
    'commands',
    'decorateNode',
    'queries',
    'renderAnnotation',
    'renderBlock',
    'renderDecoration',
    'renderDocument',
    'renderEditor',
    'renderInline',
    'renderMark',
    'schema'
];
function EditorPropsPlugin(options = {}) {
    const plugin = PROPS.reduce((memo, prop) => {
        if (prop in options) {
            if (options[prop]) {
                memo[prop] = options[prop];
            }
        }
        return memo;
    }, {});
    return plugin;
}
export default EditorPropsPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLXByb3BzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1zbGF0ZS9jb3JlLyIsInNvdXJjZXMiOlsicGx1Z2lucy9hbmd1bGFyL2VkaXRvci1wcm9wcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGNBQWMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU1RCxNQUFNLEtBQUssR0FBRztJQUNWLEdBQUcsY0FBYztJQUNqQixVQUFVO0lBQ1YsY0FBYztJQUNkLFNBQVM7SUFDVCxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGNBQWM7SUFDZCxZQUFZO0lBQ1osUUFBUTtDQUNYLENBQUM7QUFFRixTQUFTLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxFQUFFO0lBQ25DLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdkMsSUFBSSxJQUFJLElBQUksT0FBTyxFQUFFO1lBQ2pCLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUI7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVQLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxlQUFlLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVWRU5UX0hBTkRMRVJTIGZyb20gJy4uLy4uL2NvbnN0YW50cy9ldmVudC1oYW5kbGVycyc7XG5cbmNvbnN0IFBST1BTID0gW1xuICAgIC4uLkVWRU5UX0hBTkRMRVJTLFxuICAgICdjb21tYW5kcycsXG4gICAgJ2RlY29yYXRlTm9kZScsXG4gICAgJ3F1ZXJpZXMnLFxuICAgICdyZW5kZXJBbm5vdGF0aW9uJyxcbiAgICAncmVuZGVyQmxvY2snLFxuICAgICdyZW5kZXJEZWNvcmF0aW9uJyxcbiAgICAncmVuZGVyRG9jdW1lbnQnLFxuICAgICdyZW5kZXJFZGl0b3InLFxuICAgICdyZW5kZXJJbmxpbmUnLFxuICAgICdyZW5kZXJNYXJrJyxcbiAgICAnc2NoZW1hJ1xuXTtcblxuZnVuY3Rpb24gRWRpdG9yUHJvcHNQbHVnaW4ob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgcGx1Z2luID0gUFJPUFMucmVkdWNlKChtZW1vLCBwcm9wKSA9PiB7XG4gICAgICAgIGlmIChwcm9wIGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zW3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgbWVtb1twcm9wXSA9IG9wdGlvbnNbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgfSwge30pO1xuXG4gICAgcmV0dXJuIHBsdWdpbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRWRpdG9yUHJvcHNQbHVnaW47XG4iXX0=