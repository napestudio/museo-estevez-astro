import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import * as THREE from "three";

const INTRO_DURATION = 1.2;

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export class Modelo {
  object: THREE.Object3D | null = null;
  private progress = 0;
  private intrinsicHeight: number | null = null;
  private targetY = 0;
  private introOffset = 0;
  cameraTravel = 0;

  constructor(onLoad: (object: THREE.Object3D) => void) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
    );

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      "/models/model.glb",
      (gltf) => {
        const model = gltf.scene;

        const bbox = new THREE.Box3().setFromObject(model);
        this.intrinsicHeight = bbox.max.y - bbox.min.y;

        model.rotation.y = Math.PI / 1.7;

        this.object = model;

        onLoad(model);
      },
      undefined,
      (err) => console.error(err),
    );
  }

  resize(camera: THREE.PerspectiveCamera) {
    if (!this.object || this.intrinsicHeight === null) return;
    const dist = camera.position.z;
    const visibleHeight =
      2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist;

    const coverage = camera.aspect >= 1 ? 0.75 : 0.45;
    this.object.scale.setScalar(
      (visibleHeight * coverage) / this.intrinsicHeight,
    );

    this.targetY =
      camera.aspect >= 1 ? -visibleHeight * 0.42 : -visibleHeight * -0.15;
    this.introOffset = -visibleHeight;
    this.cameraTravel =
      camera.aspect >= 1 ? visibleHeight * 2.5 : visibleHeight * 1.15;
  }

  update(delta: number) {
    if (!this.object || this.progress >= 1) return;
    this.progress = Math.min(1, this.progress + delta / INTRO_DURATION);
    this.object.position.y =
      this.targetY + this.introOffset * (1 - easeOutQuart(this.progress));
  }
}
