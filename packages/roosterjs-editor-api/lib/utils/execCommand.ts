import { BrowserManagedFormatCommandMap } from 'roosterjs-editor-dom';
import { Editor } from 'roosterjs-editor-core';
import {
    ChangeSource,
    DocumentCommand,
    PluginEventType,
    BrowserManagedFormatNames,
} from 'roosterjs-editor-types';

/**
 * Execute a document command
 * @param editor The editor instance
 * @param command The command to execute
 */
export default function execCommand(editor: Editor, command: DocumentCommand) {
    editor.focus();
    let formatter = () => editor.getDocument().execCommand(command, false, null);

    let range = editor.getSelectionRange();
    if (range && range.collapsed) {
        editor.addUndoSnapshot();
        formatter();

        let formatName = (<BrowserManagedFormatNames[]>(
            Object.keys(BrowserManagedFormatCommandMap)
        )).filter(key => BrowserManagedFormatCommandMap[key] == command)[0];

        if (formatName) {
            editor.triggerEvent({
                eventType: PluginEventType.BrowserManagedFormatChanged,
                formatName,
            });
        }
    } else {
        editor.addUndoSnapshot(formatter, ChangeSource.Format);
    }
}
