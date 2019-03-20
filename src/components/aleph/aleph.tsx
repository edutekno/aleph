import { Component, Prop, State, Method } from "@stencil/core";
import { Store, Action } from "@stencil/redux";
import {
  appSetSrc,
  appSetSrcLoaded,
  appAddTool,
  appRemoveTool,
  appSelectTool,
  appSaveTools,
  appSetDisplayMode,
  appSetOrientation,
  appSetToolsVisible,
  appSetToolsEnabled,
  appSetToolType,
  appSetOptionsVisible,
  appSetOptionsEnabled,
  appSetBoundingBoxVisible,
  appSetSlicesIndex,
  appSetSlicesWindowWidth,
  appSetSlicesWindowCenter,
  appSetVolumeSteps,
  appSetVolumeWindowWidth,
  appSetVolumeWindowCenter,
  appSetAngleToolEnabled,
  appSetAnnotationToolEnabled,
  appSetRulerToolEnabled
} from "../../redux/actions";
import { configureStore } from "../../redux/store";
import { Tool } from "../../interfaces/interfaces";
import { ToolType } from "../../enums/ToolType";
import { Orientation } from "../../enums/Orientation";
import { DisplayMode } from "../../enums/DisplayMode";
import { GetUtils, ThreeUtils, CreateUtils } from "../../utils/utils";
import { Constants } from "../../Constants";
type Entity = import("aframe").Entity;

@Component({
  tag: "uv-aleph",
  styleUrl: "aleph.css",
  shadow: true
})
export class Aleph {
  private _container: HTMLElement;
  private _scene: Entity;
  private _focusEntity: Entity;
  private _srcLoadedHandler: any;
  private _toolIntersectedHandler: any;
  private _stack: any;
  private _stackHelper: AMI.StackHelper;

  @Prop({ context: "store" }) store: Store;
  @Prop() dracoDecoderPath: string | null;

  appSetSrc: Action;
  appSetSrcLoaded: Action;
  appAddTool: Action;
  appRemoveTool: Action;
  appSelectTool: Action;
  appSaveTools: Action;
  appSetDisplayMode: Action;
  appSetOrientation: Action;
  appSetToolsVisible: Action;
  appSetToolsEnabled: Action;
  appSetToolType: Action;
  appSetOptionsVisible: Action;
  appSetOptionsEnabled: Action;
  appSetBoundingBoxVisible: Action;
  appSetSlicesIndex: Action;
  appSetSlicesWindowWidth: Action;
  appSetSlicesWindowCenter: Action;
  appSetVolumeSteps: Action;
  appSetVolumeWindowWidth: Action;
  appSetVolumeWindowCenter: Action;
  appSetAngleToolEnabled: Action;
  appSetAnnotationToolEnabled: Action;
  appSetRulerToolEnabled: Action;

  @State() src: string | null;
  @State() srcLoaded: boolean;
  @State() selectedTool: number;
  @State() tools: Tool[];
  @State() displayMode: DisplayMode;
  @State() orientation: Orientation;
  @State() toolsVisible: boolean;
  @State() toolsEnabled: boolean;
  @State() toolType: ToolType;
  @State() optionsVisible: boolean;
  @State() optionsEnabled: boolean;
  @State() boundingBoxVisible: boolean;
  @State() slicesIndex: number;
  @State() slicesWindowWidth: number;
  @State() slicesWindowCenter: number;
  @State() volumeSteps: number;
  @State() volumeWindowWidth: number;
  @State() volumeWindowCenter: number;
  @State() angleToolEnabled: boolean;
  @State() annotationToolEnabled: boolean;
  @State() rulerToolEnabled: boolean;

  @Method()
  async setSrc(src: string) {
    this.appSetSrc(src);
  }

  componentWillLoad() {
    CreateUtils.createAframeComponents();

    this.store.setStore(configureStore({}));

    this.store.mapStateToProps(this, state => {
      const {
        app: {
          src,
          srcLoaded,
          selectedTool,
          tools,
          displayMode,
          orientation,
          toolsVisible,
          toolsEnabled,
          toolType,
          optionsVisible,
          optionsEnabled,
          boundingBoxVisible,
          THREEJSSceneNeedsUpdate,
          slicesIndex,
          slicesWindowWidth,
          slicesWindowCenter,
          volumeSteps,
          volumeWindowWidth,
          volumeWindowCenter,
          angleToolEnabled,
          annotationToolEnabled,
          rulerToolEnabled
        }
      } = state;

      return {
        src,
        srcLoaded,
        selectedTool,
        tools,
        displayMode,
        orientation,
        toolsVisible,
        toolsEnabled,
        toolType,
        optionsVisible,
        optionsEnabled,
        boundingBoxVisible,
        THREEJSSceneNeedsUpdate,
        slicesIndex,
        slicesWindowWidth,
        slicesWindowCenter,
        volumeSteps,
        volumeWindowWidth,
        volumeWindowCenter,
        angleToolEnabled,
        annotationToolEnabled,
        rulerToolEnabled
      };
    });

    this.store.mapDispatchToProps(this, {
      appSetSrc,
      appSetSrcLoaded,
      appAddTool,
      appRemoveTool,
      appSelectTool,
      appSaveTools,
      appSetDisplayMode,
      appSetOrientation,
      appSetToolsVisible,
      appSetToolsEnabled,
      appSetToolType,
      appSetOptionsVisible,
      appSetOptionsEnabled,
      appSetBoundingBoxVisible,
      appSetSlicesIndex,
      appSetSlicesWindowWidth,
      appSetSlicesWindowCenter,
      appSetVolumeSteps,
      appSetVolumeWindowWidth,
      appSetVolumeWindowCenter,
      appSetAngleToolEnabled,
      appSetAnnotationToolEnabled,
      appSetRulerToolEnabled
    });

    // set up event handlers
    this._srcLoadedHandler = this._srcLoaded.bind(this);
    this._toolIntersectedHandler = this._toolIntersected.bind(this);

    // todo: remove
    console.log(this._container);
  }

  private _renderSrc() {
    return this.src ? (
      <a-entity
        id="focusEntity"
        ref={(el: Entity) => (this._focusEntity = el)}
        al-gltf-model={`
            src: url(${this.src});
            dracoDecoderPath: ${this.dracoDecoderPath};
          `}
        position="0 0 0"
        scale="1 1 1"
      />
    ) : null;
  }

  private _renderTools(): JSX.Element {
    const tools: JSX.Element[] = [];

    for (var i = 0; i < this.tools.length; i++) {
      if (i < this.tools.length) {
        const tool: Tool = this.tools[i];

        tools.push(
          <a-entity
            id={tool.id}
            geometry="primitive: sphere;"
            position={tool.position}
            material={`color: ${
              this.selectedTool === tool.id ? tool.selectedColor : tool.color
            };
            shader: flat`}
          />
        );
      }
    }

    return tools;
  }

  private _renderLights(): JSX.Element {
    return [
      <a-entity
        light="type: directional; color: #ffffff; intensity: 0.75"
        position="1 1 1"
      />,
      <a-entity
        light="type: directional; color: #002958; intensity: 0.5"
        position="-1 -1 -1"
      />,
      <a-entity light="type: ambient; color: #d0d0d0; intensity: 1" />
    ];
  }

  private _renderCamera(): JSX.Element {
    if (this.srcLoaded) {
      let orbitData = GetUtils.getOrbitData(this._focusEntity);

      return (
        <a-camera
          id="main-camera"
          fov={Constants.cameraValues.fov}
          near={Constants.cameraValues.near}
          far={Constants.cameraValues.far}
          look-controls="enabled: false"
          position="0 0 0"
          orbit-controls={`
            maxPolarAngle: 165;
            minDistance: 0;
            screenSpacePanning: true;
            rotateSpeed: 0.75;
            zoomSpeed: 1.2;
            enableDamping: true;
            dampingFactor: 0.25;
            target: ${ThreeUtils.vector3ToString(orbitData.sceneCenter)};
            initialPosition: ${ThreeUtils.vector3ToString(
              orbitData.initialPosition
            )};
            enableDamping: true;
            zoomSpeed: 1;`}
        />
      );
    } else {
      return null;
    }
  }

  private _renderScene(): JSX.Element {
    return (
      <a-scene
        inspector
        ref={(el: Entity) => (this._scene = el)}
        embedded
        renderer="colorManagement: true;"
        vr-mode-ui="enabled: false"
      >
        {this._renderSrc()}
        {this._renderTools()}
        {this._renderLights()}
        {this._renderCamera()}
      </a-scene>
    );
  }

  private _renderControlPanel(): JSX.Element {
    // todo: tunnel state
    return (
      <div id="control-panel">
        <al-control-panel
          angleToolEnabled={this.angleToolEnabled}
          annotationToolEnabled={this.annotationToolEnabled}
          boundingBoxVisible={this.boundingBoxVisible}
          displayMode={this.displayMode}
          optionsEnabled={this.optionsEnabled}
          optionsVisible={this.optionsVisible}
          orientation={this.orientation}
          rulerToolEnabled={this.rulerToolEnabled}
          selectedTool={this.selectedTool}
          slicesIndex={this.slicesIndex}
          slicesWindowCenter={this.slicesWindowCenter}
          slicesWindowWidth={this.slicesWindowWidth}
          stack={this._stack}
          stackHelper={this._stackHelper}
          tools={this.tools}
          toolsEnabled={this.toolsEnabled}
          toolsVisible={this.toolsVisible}
          toolType={this.toolType}
          volumeSteps={this.volumeSteps}
          volumeWindowCenter={this.volumeWindowCenter}
          volumeWindowWidth={this.volumeWindowWidth}
          addTool={this.appAddTool}
          removeTool={this.appRemoveTool}
          saveTools={this.appSaveTools}
          selectTool={this.appSelectTool}
          setBoundingBoxVisible={this.appSetBoundingBoxVisible}
          setDisplayMode={this.appSetDisplayMode}
          setOptionsEnabled={this.appSetOptionsEnabled}
          setOrientation={this.appSetOrientation}
          setSlicesIndex={this.appSetSlicesIndex}
          setSlicesWindowCenter={this.appSetSlicesWindowCenter}
          setSlicesWindowWidth={this.appSetSlicesWindowWidth}
          setToolsEnabled={this.appSetToolsEnabled}
          setToolType={this.appSetToolType}
          setVolumeSteps={this.appSetVolumeSteps}
          setVolumeWindowCenter={this.appSetVolumeWindowCenter}
          setVolumeWindowWidth={this.appSetVolumeWindowWidth}
        />
      </div>
    );
  }

  render(): JSX.Element {
    return (
      <div id="container" ref={(el: HTMLElement) => (this._container = el)}>
        {this._renderScene()}
        {this._renderControlPanel()}
      </div>
    );
  }

  private _getToolEls(): NodeListOf<Entity> {
    return this._scene.querySelectorAll(".tool");
  }

  private _srcLoaded(): void {
    this.appSetSrcLoaded(true);
  }

  private _toolIntersected(event: CustomEvent): void {
    const id: number = Number(event.detail.intersection.object.el.id);
    if (this.selectedTool !== id) {
      this.appSelectTool(id);
    }
  }

  private _addEventListeners(): void {
    if (this._scene) {
      this._getToolEls().forEach((el: Entity) => {
        el.addEventListener(
          "intersection",
          this._toolIntersectedHandler,
          false
        );
      });

      if (this._focusEntity) {
        this._focusEntity.addEventListener(
          "model-loaded",
          this._srcLoadedHandler,
          false
        );
      }
    }
  }

  componentDidUpdate() {
    this._addEventListeners();
  }
}
