/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';

import '@stencil/redux';
import {
  AlAngleSerial,
  AlEdgeSerial,
  AlNodeSerial,
} from './interfaces';
import {
  DisplayMode,
} from './enums/DisplayMode';
import {
  Orientation,
} from './enums/Orientation';
import {
  AlGraph,
} from './interfaces/AlGraph';
import {
  DisplayMode as DisplayMode2,
  Orientation as Orientation2,
} from './enums';


export namespace Components {

  interface AlAngleEditor {
    'angle': [string, AlAngleSerial];
  }
  interface AlAngleEditorAttributes extends StencilHTMLAttributes {
    'angle'?: [string, AlAngleSerial];
    'onDelete'?: (event: CustomEvent) => void;
  }

  interface AlConsole {
    'cmd': string;
  }
  interface AlConsoleAttributes extends StencilHTMLAttributes {
    'cmd'?: string;
    'onCommand'?: (event: CustomEvent) => void;
  }

  interface AlControlPanel {
    'boundingBoxVisible': boolean;
    'displayMode': DisplayMode;
    'graphEnabled': boolean;
    'graphVisible': boolean;
    'optionsEnabled': boolean;
    'optionsVisible': boolean;
    'orientation': Orientation;
    'slicesIndex': number;
    'slicesWindowCenter': number;
    'slicesWindowWidth': number;
    'stackhelper': AMI.StackHelper
    | AMI.VolumeRenderHelper;
    'volumeSteps': number;
    'volumeWindowCenter': number;
    'volumeWindowWidth': number;
  }
  interface AlControlPanelAttributes extends StencilHTMLAttributes {
    'boundingBoxVisible'?: boolean;
    'displayMode'?: DisplayMode;
    'graphEnabled'?: boolean;
    'graphVisible'?: boolean;
    'onBoundingBoxVisibleChanged'?: (event: CustomEvent) => void;
    'onDisplayModeChanged'?: (event: CustomEvent) => void;
    'onGraphEnabledChanged'?: (event: CustomEvent) => void;
    'onOptionsEnabledChanged'?: (event: CustomEvent) => void;
    'onOrientationChanged'?: (event: CustomEvent) => void;
    'onSlicesIndexChanged'?: (event: CustomEvent) => void;
    'onSlicesWindowCenterChanged'?: (event: CustomEvent) => void;
    'onSlicesWindowWidthChanged'?: (event: CustomEvent) => void;
    'onVolumeStepsChanged'?: (event: CustomEvent) => void;
    'onVolumeWindowCenterChanged'?: (event: CustomEvent) => void;
    'onVolumeWindowWidthChanged'?: (event: CustomEvent) => void;
    'optionsEnabled'?: boolean;
    'optionsVisible'?: boolean;
    'orientation'?: Orientation;
    'slicesIndex'?: number;
    'slicesWindowCenter'?: number;
    'slicesWindowWidth'?: number;
    'stackhelper'?: AMI.StackHelper
    | AMI.VolumeRenderHelper;
    'volumeSteps'?: number;
    'volumeWindowCenter'?: number;
    'volumeWindowWidth'?: number;
  }

  interface AlEdgeEditor {
    'edge': [string, AlEdgeSerial];
  }
  interface AlEdgeEditorAttributes extends StencilHTMLAttributes {
    'edge'?: [string, AlEdgeSerial];
    'onDelete'?: (event: CustomEvent) => void;
  }

  interface AlNodeEditor {
    'node': [string, AlNodeSerial];
  }
  interface AlNodeEditorAttributes extends StencilHTMLAttributes {
    'node'?: [string, AlNodeSerial];
    'onDelete'?: (event: CustomEvent) => void;
    'onSave'?: (event: CustomEvent) => void;
  }

  interface AlNodeList {
    'nodes': Map<string, AlNodeSerial> | null;
    'selected': string | null;
  }
  interface AlNodeListAttributes extends StencilHTMLAttributes {
    'nodes'?: Map<string, AlNodeSerial> | null;
    'onSelectedChanged'?: (event: CustomEvent) => void;
    'selected'?: string | null;
  }

  interface AlTabs {
    /**
    * Get the currently selected tab
    */
    'getSelected': () => Promise<string>;
    /**
    * Get the tab element given the tab name
    */
    'getTab': (tab: any) => Promise<any>;
    /**
    * Index or the Tab instance, of the tab to select.
    */
    'select': (tab: any) => Promise<boolean>;
  }
  interface AlTabsAttributes extends StencilHTMLAttributes {
    /**
    * Emitted when the navigation has finished transitioning to a new component.
    */
    'onIonTabsDidChange'?: (event: CustomEvent<{ tab: string }>) => void;
    /**
    * Emitted when the navigation is about to transition to a new component.
    */
    'onIonTabsWillChange'?: (event: CustomEvent<{ tab: string }>) => void;
  }

  interface AlUrlPicker {
    'url': string | null;
    'urls': Map<string, string> | null;
  }
  interface AlUrlPickerAttributes extends StencilHTMLAttributes {
    'onUrlChanged'?: (event: CustomEvent) => void;
    'url'?: string | null;
    'urls'?: Map<string, string> | null;
  }

  interface UvAleph {
    'clearGraph': () => Promise<void>;
    'debug': boolean;
    'deleteAngle': (angleId: string) => Promise<void>;
    'deleteEdge': (edgeId: string) => Promise<void>;
    'deleteNode': (nodeId: string) => Promise<void>;
    'dracoDecoderPath': string | null;
    'height': string;
    'load': (src: string) => Promise<void>;
    'resize': () => Promise<void>;
    'selectNode': (nodeId: string) => Promise<void>;
    'setBoundingBoxVisible': (visible: boolean) => Promise<void>;
    'setDisplayMode': (displayMode: DisplayMode) => Promise<void>;
    'setEdge': (edge: [string, AlEdgeSerial]) => Promise<void>;
    'setGraph': (graph: AlGraph) => Promise<void>;
    'setGraphEnabled': (enabled: boolean) => Promise<void>;
    'setNode': (node: [string, AlNodeSerial]) => Promise<void>;
    'setOrientation': (orientation: Orientation) => Promise<void>;
    'setSlicesIndex': (index: number) => Promise<void>;
    'setSlicesWindowCenter': (center: number) => Promise<void>;
    'setSlicesWindowWidth': (width: number) => Promise<void>;
    'setVolumeSteps': (steps: number) => Promise<void>;
    'setVolumeWindowCenter': (center: number) => Promise<void>;
    'setVolumeWindowWidth': (width: number) => Promise<void>;
    'spinnerColor': string;
    'width': string;
  }
  interface UvAlephAttributes extends StencilHTMLAttributes {
    'debug'?: boolean;
    'dracoDecoderPath'?: string | null;
    'height'?: string;
    'onChanged'?: (event: CustomEvent) => void;
    'onLoaded'?: (event: CustomEvent) => void;
    'spinnerColor'?: string;
    'width'?: string;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AlAngleEditor': Components.AlAngleEditor;
    'AlConsole': Components.AlConsole;
    'AlControlPanel': Components.AlControlPanel;
    'AlEdgeEditor': Components.AlEdgeEditor;
    'AlNodeEditor': Components.AlNodeEditor;
    'AlNodeList': Components.AlNodeList;
    'AlTabs': Components.AlTabs;
    'AlUrlPicker': Components.AlUrlPicker;
    'UvAleph': Components.UvAleph;
  }

  interface StencilIntrinsicElements {
    'al-angle-editor': Components.AlAngleEditorAttributes;
    'al-console': Components.AlConsoleAttributes;
    'al-control-panel': Components.AlControlPanelAttributes;
    'al-edge-editor': Components.AlEdgeEditorAttributes;
    'al-node-editor': Components.AlNodeEditorAttributes;
    'al-node-list': Components.AlNodeListAttributes;
    'al-tabs': Components.AlTabsAttributes;
    'al-url-picker': Components.AlUrlPickerAttributes;
    'uv-aleph': Components.UvAlephAttributes;
  }


  interface HTMLAlAngleEditorElement extends Components.AlAngleEditor, HTMLStencilElement {}
  var HTMLAlAngleEditorElement: {
    prototype: HTMLAlAngleEditorElement;
    new (): HTMLAlAngleEditorElement;
  };

  interface HTMLAlConsoleElement extends Components.AlConsole, HTMLStencilElement {}
  var HTMLAlConsoleElement: {
    prototype: HTMLAlConsoleElement;
    new (): HTMLAlConsoleElement;
  };

  interface HTMLAlControlPanelElement extends Components.AlControlPanel, HTMLStencilElement {}
  var HTMLAlControlPanelElement: {
    prototype: HTMLAlControlPanelElement;
    new (): HTMLAlControlPanelElement;
  };

  interface HTMLAlEdgeEditorElement extends Components.AlEdgeEditor, HTMLStencilElement {}
  var HTMLAlEdgeEditorElement: {
    prototype: HTMLAlEdgeEditorElement;
    new (): HTMLAlEdgeEditorElement;
  };

  interface HTMLAlNodeEditorElement extends Components.AlNodeEditor, HTMLStencilElement {}
  var HTMLAlNodeEditorElement: {
    prototype: HTMLAlNodeEditorElement;
    new (): HTMLAlNodeEditorElement;
  };

  interface HTMLAlNodeListElement extends Components.AlNodeList, HTMLStencilElement {}
  var HTMLAlNodeListElement: {
    prototype: HTMLAlNodeListElement;
    new (): HTMLAlNodeListElement;
  };

  interface HTMLAlTabsElement extends Components.AlTabs, HTMLStencilElement {}
  var HTMLAlTabsElement: {
    prototype: HTMLAlTabsElement;
    new (): HTMLAlTabsElement;
  };

  interface HTMLAlUrlPickerElement extends Components.AlUrlPicker, HTMLStencilElement {}
  var HTMLAlUrlPickerElement: {
    prototype: HTMLAlUrlPickerElement;
    new (): HTMLAlUrlPickerElement;
  };

  interface HTMLUvAlephElement extends Components.UvAleph, HTMLStencilElement {}
  var HTMLUvAlephElement: {
    prototype: HTMLUvAlephElement;
    new (): HTMLUvAlephElement;
  };

  interface HTMLElementTagNameMap {
    'al-angle-editor': HTMLAlAngleEditorElement
    'al-console': HTMLAlConsoleElement
    'al-control-panel': HTMLAlControlPanelElement
    'al-edge-editor': HTMLAlEdgeEditorElement
    'al-node-editor': HTMLAlNodeEditorElement
    'al-node-list': HTMLAlNodeListElement
    'al-tabs': HTMLAlTabsElement
    'al-url-picker': HTMLAlUrlPickerElement
    'uv-aleph': HTMLUvAlephElement
  }

  interface ElementTagNameMap {
    'al-angle-editor': HTMLAlAngleEditorElement;
    'al-console': HTMLAlConsoleElement;
    'al-control-panel': HTMLAlControlPanelElement;
    'al-edge-editor': HTMLAlEdgeEditorElement;
    'al-node-editor': HTMLAlNodeEditorElement;
    'al-node-list': HTMLAlNodeListElement;
    'al-tabs': HTMLAlTabsElement;
    'al-url-picker': HTMLAlUrlPickerElement;
    'uv-aleph': HTMLUvAlephElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
