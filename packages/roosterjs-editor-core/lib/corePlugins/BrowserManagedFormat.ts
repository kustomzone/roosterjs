import Editor from '../editor/Editor';
import EditorPlugin from '../interfaces/EditorPlugin';
import { BrowserManagedFormatCommandMap, getBrowserManagedFormatState } from 'roosterjs-editor-dom';
import {
    BrowserManagedFormatState,
    BrowserManagedFormatNames,
    PluginEvent,
    PluginEventType,
    NodePosition,
} from 'roosterjs-editor-types';

/**
 * BrowserManagedFormat plugin caches the value of browser managed format states,
 * and provide a method to allow browser retrive its value
 */
export default class BrowserManagedFormat implements EditorPlugin {
    private editor: Editor;
    private cachedFormat: Partial<BrowserManagedFormatState> = {};
    private cachedPosition: NodePosition;
    private disposer: () => void;

    getName() {
        return 'BrowserManagedFormat';
    }

    initialize(editor: Editor) {
        this.editor = editor;
        this.disposer = editor.addDomEventHandler('focus', this.onFocus);
    }

    dispose() {
        this.disposer();
        this.editor = null;
    }

    /**
     * Handle events triggered from editor
     * @param event PluginEvent object
     */
    onPluginEvent(event: PluginEvent) {
        switch (event.eventType) {
            case PluginEventType.BrowserManagedFormatChanged:
                let formatName = event.formatName;
                let command = BrowserManagedFormatCommandMap[formatName];
                let document = this.editor.getDocument();
                this.cachedFormat[formatName] = document.queryCommandState(command);
                this.cachedPosition = this.editor.getFocusedPosition();
                break;
            case PluginEventType.MouseDown:
            case PluginEventType.KeyDown:
            case PluginEventType.ContentChanged:
                this.cachedFormat = {};
                this.cachedPosition = null;
                break;
        }
    }

    /**
     * Some API can change the DOM structure, and temporary format state (B/I/U/...) will be lost.
     * Call this function can restore the temporary format state
     */
    restoreBrowserManagedFormatState() {
        let document = this.editor.getDocument();
        let newFormat = getBrowserManagedFormatState(document);
        Object.keys(this.cachedFormat).forEach((key: BrowserManagedFormatNames) => {
            if (newFormat[key] != this.cachedFormat[key]) {
                document.execCommand(BrowserManagedFormatCommandMap[key], false, null);
            }
        });
    }

    private onFocus = () => {
        if (this.cachedPosition && this.cachedPosition.equalTo(this.editor.getFocusedPosition())) {
            this.restoreBrowserManagedFormatState();
        }
    };
}
