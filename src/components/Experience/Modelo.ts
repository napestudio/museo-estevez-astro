import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import * as THREE from "three";

const TARGET_Y = -0.7;
const INTRO_OFFSET = -2;
const INTRO_DURATION = 1.2;

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export class Modelo {
  object: THREE.Object3D | null = null;
  private progress = 0;

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
        model.scale.setScalar(0.15);
        model.rotation.y = Math.PI * 1.5;
        model.position.y = TARGET_Y + INTRO_OFFSET;

        this.object = model;

        onLoad(model);
      },
      undefined,
      (err) => console.error(err),
    );
  }

  update(delta: number) {
    if (!this.object || this.progress >= 1) return;
    this.progress = Math.min(1, this.progress + delta / INTRO_DURATION);
    this.object.position.y =
      TARGET_Y + INTRO_OFFSET * (1 - easeOutQuart(this.progress));
  }
}
