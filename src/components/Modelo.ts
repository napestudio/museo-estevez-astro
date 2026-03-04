import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import * as THREE from "three";

export class Modelo {
  object: THREE.Group | THREE.Object3D | null = null;

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
        this.object = gltf.scene;
        this.object.scale.setScalar(0.2);
        this.object.rotation.y = Math.PI * 1.5;
        onLoad(this.object);
      },
      undefined,
      (error) => {
        console.error("An error happened while loading the model:", error);
      },
    );
  }

  update(delta: number): void {
    if (!this.object) return;
    this.object.rotation.x += delta * 0;
    this.object.rotation.y += delta * 0.05;
  }
}
