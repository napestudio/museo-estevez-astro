import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export class RotatingCube {
  readonly mesh: THREE.Mesh<RoundedBoxGeometry, THREE.MeshStandardMaterial>;

  constructor() {
    const geometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.1);
    const material = new THREE.MeshStandardMaterial({ color: 0xff2d2d });
    this.mesh = new THREE.Mesh(geometry, material);
  }

  update(delta: number): void {
    this.mesh.rotation.x += delta * 0.5;
    this.mesh.rotation.y += delta * 0.8;
  }
}
