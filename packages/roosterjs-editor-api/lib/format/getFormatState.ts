import { cacheGetElementAtCursor, Editor } from 'roosterjs-editor-core';
import {
    getComputedStyles,
    getTagOfNode,
    Position,
    getBrowserManagedFormatState,
} from 'roosterjs-editor-dom';
import {
    FormatState,
    PluginEvent,
    QueryScope,
    DomBasedFormatState,
    EditorManagedFormatState,
} from 'roosterjs-editor-types';

/**
 * Get DOM based Format State at cursor
 * @param editor The editor instance
 * @param event (Optional) The plugin event, it stores the event cached data for looking up.
 * In this function the event cache is used to get list state and header level. If not passed,
 * it will query the node within selection to get the info
 * @returns A DomBasedFormatState object
 */
export function getDomBasedFormatState(editor: Editor, event?: PluginEvent): DomBasedFormatState {
    let range = editor.getSelectionRange();
    let node = range && Position.getStart(range).normalize().node;
    let styles = node ? getComputedStyles(node) : [];
    let listTag = getTagOfNode(cacheGetElementAtCursor(editor, event, 'OL,UL'));
    let headerTag = getTagOfNode(cacheGetElementAtCursor(editor, event, 'H1,H2,H3,H4,H5,H6'));

    return {
        fontName: styles[0],
        fontSize: styles[1],
        textColor: styles[2],
        backgroundColor: styles[3],

        isBullet: listTag == 'UL',
        isNumbering: listTag == 'OL',
        headerLevel: (headerTag && parseInt(headerTag[1])) || 0,

        canUnlink: !!editor.queryElements('a[href]', QueryScope.OnSelection)[0],
        canAddImageAltText: !!editor.queryElements('img', QueryScope.OnSelection)[0],
        isBlockQuote: !!editor.queryElements('blockquote', QueryScope.OnSelection)[0],
    };
}

/**
 * Get Editor Managed Format State at cursor
 * @param editor The editor instance
 * @returns An EditorManagedFormatState object
 */
export function getEditorManagedFormatState(editor: Editor): EditorManagedFormatState {
    return {
        canUndo: editor.canUndo(),
        canRedo: editor.canRedo(),
    };
}

/**
 * Get format state at cursor
 * A format state is a collection of all format related states, e.g.,
 * bold, italic, underline, font name, font size, etc.
 * @param editor The editor instance
 * @param event (Optional) The plugin event, it stores the event cached data for looking up.
 * In this function the event cache is used to get list state and header level. If not passed,
 * it will query the node within selection to get the info
 * @returns The format state at cursor
 */
export default function getFormatState(editor: Editor, event?: PluginEvent): FormatState {
    return {
        ...getBrowserManagedFormatState(editor.getDocument()),
        ...getDomBasedFormatState(editor, event),
        ...getEditorManagedFormatState(editor),
    };
}
