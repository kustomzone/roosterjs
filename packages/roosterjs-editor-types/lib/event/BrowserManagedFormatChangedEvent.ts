import BasePluginEvent from './BasePluginEvent';
import { BrowserManagedFormatNames } from '../interface/FormatState';
import { PluginEventType } from './PluginEventType';

export default interface BrowserManagedFormatChangedEvent
    extends BasePluginEvent<PluginEventType.BrowserManagedFormatChanged> {
    formatName: BrowserManagedFormatNames;
}
