import { AframeRegistry, AframeComponent } from "../interfaces";
import { Constants } from "../Constants";
import { ThreeUtils } from "../utils";

interface AlNodeState {
  selected: boolean;
  hovered: boolean;
  //geometry: THREE.CircleGeometry;
  geometry: THREE.SphereGeometry;
  material: THREE.MeshBasicMaterial;
  mesh: THREE.Mesh;
  camera: THREE.Camera;
  target: THREE.Vector3;
  dragging: boolean;
  mouseDown: boolean;
}

interface AlNodeObject extends AframeComponent {
  update(oldData): void;
  tickFunction(): void;
  tick(): void;
  remove(): void;
  bindListeners(): void;
  addListeners(): void;
  removeListeners(): void;
  elMouseDown(_event: CustomEvent): void;
  canvasMouseUp(_event: MouseEvent): void;
  elRaycasterIntersected(_event: CustomEvent): void;
  elRaycasterIntersectedCleared(_event: CustomEvent): void;
}

export class AlNode implements AframeRegistry {
  public static get Object(): AlNodeObject {
    return {
      schema: {
        target: { type: "vec3" },
        scale: { type: "number", default: 1 },
        selected: { type: "boolean" },
        nodesEnabled: { type: "boolean" }
      },

      bindListeners(): void {
        this.elMouseDown = this.elMouseDown.bind(this);
        this.canvasMouseUp = this.canvasMouseUp.bind(this);
        this.elRaycasterIntersected = this.elRaycasterIntersected.bind(this);
        this.elRaycasterIntersectedCleared = this.elRaycasterIntersectedCleared.bind(
          this
        );
      },

      addListeners(): void {
        this.el.addEventListener("mousedown", this.elMouseDown, {
          capture: false,
          once: false,
          passive: true
        });
        this.el.sceneEl.canvas.addEventListener("mouseup", this.canvasMouseUp, {
          capture: false,
          once: false,
          passive: true
        });
        this.el.addEventListener(
          "raycaster-intersected",
          this.elRaycasterIntersected,
          { capture: false, once: false, passive: true }
        );
        this.el.addEventListener(
          "raycaster-intersected-cleared",
          this.elRaycasterIntersectedCleared,
          { capture: false, once: false, passive: true }
        );
      },

      removeListeners(): void {
        this.el.removeEventListener("mousedown", this.elMouseDown);
        this.el.removeEventListener("mouseup", this.canvasMouseUp);
        this.el.removeEventListener(
          "raycaster-intersected",
          this.elRaycasterIntersected
        );
        this.el.removeEventListener(
          "raycaster-intersected-cleared",
          this.elRaycasterIntersectedCleared
        );
      },

      elMouseDown(_event: CustomEvent): void {
        window.setTimeout(() => {
          this.el.sceneEl.emit(AlNodeEvents.SELECTED, { id: this.el.id }, true);

          if (this.data.nodesEnabled) {
            let state = this.state as AlNodeState;
            state.mouseDown = true;
            this.el.sceneEl.emit(AlNodeEvents.CONTROLS_DISABLED, {}, true);
          }
        }, Constants.minFrameMS);
      },

      canvasMouseUp(_event: MouseEvent): void {
        if (this.data.nodesEnabled) {
          let state = this.state as AlNodeState;
          state.dragging = false;
          state.mouseDown = false;
          this.el.sceneEl.emit(AlNodeEvents.CONTROLS_ENABLED, {}, true);
        }
      },

      elRaycasterIntersected(_event: CustomEvent): void {
        let state = this.state as AlNodeState;
        state.hovered = true;
        this.el.sceneEl.emit(
          AlNodeEvents.INTERSECTION,
          { id: this.el.id },
          true
        );
      },

      elRaycasterIntersectedCleared(_event: CustomEvent): void {
        let state = this.state as AlNodeState;
        state.hovered = false;
        if (state.mouseDown && state.selected) {
          state.dragging = true;
        }
        this.el.sceneEl.emit(AlNodeEvents.INTERSECTION_CLEARED, {}, true);
      },

      init(): void {
        this.tickFunction = AFRAME.utils.throttle(
          this.tickFunction,
          Constants.minFrameMS,
          this
        );
        this.bindListeners();
        this.addListeners();

        const data = this.data;
        let el = this.el;

        const camera = el.sceneEl.camera.el.object3DMap.camera;
        const geometry = new THREE.SphereGeometry(data.scale, 16, 16);
        //const geometry = new THREE.CircleGeometry(data.scale, 32);
        let material = new THREE.MeshBasicMaterial();
        const mesh = new THREE.Mesh(geometry, material);

        el.setObject3D("mesh", mesh);

        //material.depthTest = false;
        //el.object3DMap.mesh.renderOrder = 999;
        // state.mesh.onBeforeRender = function(renderer) {
        //   renderer.clearDepth();
        // };

        let targetPos = ThreeUtils.objectToVector3(data.target);

        this.state = {
          selected: true,
          hovered: false,
          geometry,
          material,
          mesh,
          camera,
          target: targetPos,
          dragging: false
        } as AlNodeState;
      },

      update(): void {
        let state = this.state as AlNodeState;
        state.target = this.data.target;
        state.selected = this.data.selected;
      },

      tickFunction(): void {
        let state = this.state as AlNodeState;
        if (this.data.nodesEnabled && state.dragging) {
          this.el.sceneEl.emit(AlNodeEvents.DRAGGING, { id: this.el.id }, true);
        }

        if (state.hovered || state.dragging) {
          state.material.color = new THREE.Color(Constants.nodeColors.hovered);
        } else if (state.selected) {
          state.material.color = new THREE.Color(Constants.nodeColors.selected);
        } else {
          state.material.color = new THREE.Color(Constants.nodeColors.normal);
        }
      },

      tick() {
        this.tickFunction();
      },

      remove(): void {
        this.removeListeners();
        this.el.removeObject3D("mesh");
      }
    } as AlNodeObject;
  }

  public static get Tag(): string {
    return "al-node";
  }
}

export class AlNodeEvents {
  static SELECTED: string = "al-node-selected";
  static INTERSECTION: string = "al-node-intersection";
  static INTERSECTION_CLEARED: string = "al-node-intersection-cleared";
  static DRAGGING: string = "al-node-dragging";
  static CONTROLS_ENABLED: string = "al-controls-enabled";
  static CONTROLS_DISABLED: string = "al-controls-disabled";
  static ANIMATION_STARTED: string = "al-animation-started";
}