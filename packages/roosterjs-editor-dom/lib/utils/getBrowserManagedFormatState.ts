import {
    BrowserManagedFormatState,
    BrowserManagedFormatNames,
    DocumentCommand,
} from 'roosterjs-editor-types';

export const BrowserManagedFormatCommandMap: {
    [key in BrowserManagedFormatNames]: DocumentCommand
} = {
    isBold: DocumentCommand.Bold,
    isItalic: DocumentCommand.Italic,
    isUnderline: DocumentCommand.Underline,
    isStrikeThrough: DocumentCommand.StrikeThrough,
    isSubscript: DocumentCommand.Subscript,
    isSuperscript: DocumentCommand.Superscript,
};

/**
 * Get Browser Managed Format State at cursor.
 * @param document The HTML Document to get format state from
 * @returns A BrowserManagedFormatState object which contains the values of browser managed format states
 */
export default function getBrowserManagedFormatState(
    document: Document
): BrowserManagedFormatState {
    let keys = Object.keys(BrowserManagedFormatCommandMap) as BrowserManagedFormatNames[];

    return keys.reduce(
        (state, key) => {
            state[key] = document.queryCommandState(BrowserManagedFormatCommandMap[key]);
            return state;
        },
        <BrowserManagedFormatState>{}
    );
}
