import * as THREE from "three";
import audioController from "../../utils/AudioController";

export default class Line {
  constructor() {
    this.nb = 256;
    this.gap = 1.5;
    this.colors = [
      0x6d5c67,
      0x9f8f90,
      0xae6e73,
      0xf4a58a,
      0xfce2b9,
    ];

    this.materials = [];

    this.colors.forEach((color) => {
      const material = new THREE.MeshBasicMaterial({
        color: color,
      });

      this.materials.push(material);
    });

    this.group = new THREE.Group();
    this.group.position.x = -(this.nb * this.gap) / 2;
    this.group.position.z = -50;

    this.geometry = new THREE.BoxGeometry(1, 1, 1);

    const MODULO = Math.round(this.nb / this.colors.length);
    let n = -1;

    for (let i = 0; i < this.nb; i++) {
      if (i % MODULO === 0) {
        n++;
      }
      const mesh = new THREE.Mesh(this.geometry, this.materials[n]);

      mesh.position.x = i * this.gap;

      this.group.add(mesh);
    }
  }

  update() {
    if (!audioController.fdata) return;

    for (let i = 0; i < this.group.children.length; i++) {
      this.group.children[i].scale.y = audioController.fdata[i];
    }

    // this.group.rotation.y += 0.1;
  }
}
