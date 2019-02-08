import Editor from '../editor/Editor';
import EditorPlugin from '../interfaces/EditorPlugin';
import { PluginEvent, PluginEventType, PluginMouseUpEvent } from 'roosterjs-editor-types';

/**
 * TempFormatState plugin manages the temporary format state (B/I/U/Strike/...).
 * When editor got blurred and focused again, the temporary fomat state will be kept.
 */
export default class TempFormatState implements EditorPlugin {
    private editor: Editor;

    getName() {
        return 'TempFormatState';
    }

    initialize(editor: Editor) {
        this.editor = editor;
    }

    dispose() {
        this.editor = null;
    }

    /**
     * Handle events triggered from editor
     * @param event PluginEvent object
     */
    onPluginEvent(event: PluginEvent) {
        if (event.eventType == PluginEventType.ContentChanged && !this.mouseUpEventListerAdded) {
            this.editor
                .getDocument()
                .addEventListener('mouseup', this.onMouseUp, true /*setCapture*/);
            this.mouseUpEventListerAdded = true;
        }
    }

    private removeMouseUpEventListener() {
        if (this.mouseUpEventListerAdded) {
            this.mouseUpEventListerAdded = false;
            this.editor.getDocument().removeEventListener('mouseup', this.onMouseUp, true);
        }
    }

    private onMouseUp = (e: MouseEvent) => {
        if (this.editor) {
            this.removeMouseUpEventListener();
            this.editor.triggerEvent(<PluginMouseUpEvent>{
                eventType: PluginEventType.MouseUp,
                rawEvent: e,
            });
        }
    };
}
