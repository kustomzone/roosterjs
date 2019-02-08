/**
 * Format states managed by browser.
 * When selection is collapsed, changing any of these states won't cause DOM change
 */
export interface BrowserManagedFormatState {
    /**
     * Whether the text is bolded
     */
    isBold?: boolean;

    /**
     * Whether the text is italic
     */
    isItalic?: boolean;

    /**
     * Whether the text has underline
     */
    isUnderline?: boolean;

    /**
     * Whether the text has strike through line
     */
    isStrikeThrough?: boolean;

    /**
     * Whether the text is in subscript mode
     */
    isSubscript?: boolean;

    /**
     * Whether the text is in superscript mode
     */
    isSuperscript?: boolean;
}

/**
 * Format states can be retrieved from DOM
 */
export interface DomBasedFormatState {
    /**
     * Font name
     */
    fontName?: string;

    /**
     * Font size
     */
    fontSize?: string;

    /**
     * Background color
     */
    backgroundColor?: string;

    /**
     * Text color
     */
    textColor?: string;

    /**
     * Whether the text is in bullet mode
     */
    isBullet?: boolean;

    /**
     * Whether the text is in numbering mode
     */
    isNumbering?: boolean;

    /**
     * Whether the text is in block quote
     */
    isBlockQuote?: boolean;

    /**
     * Whether unlink command can be called to the text
     */
    canUnlink?: boolean;

    /**
     * Whether add image alt text command can be called to the text
     */
    canAddImageAltText?: boolean;

    /**
     * Header level (0-6, 0 means no header)
     */
    headerLevel?: number;
}

/**
 * Format states manged by editor
 */
export interface EditorManagedFormatState {
    /**
     * Whether the content can be undone
     */
    canUndo?: boolean;

    /**
     * Whether the content ca nbe redone
     */
    canRedo?: boolean;
}

/**
 * The format state
 */
export default interface FormatState
    extends BrowserManagedFormatState,
        DomBasedFormatState,
        EditorManagedFormatState {}
