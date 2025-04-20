
import * as THREE from "three";
import audioController from "../../utils/AudioController";
import particleTexture from "../../assets/star.png";

export default class ParticlesInteractive {
  constructor() {
    this.count = 1000;

    this.positions = new Float32Array(this.count * 3);
    this.basePositions = new Float32Array(this.count * 3);
    this.sizes = new Float32Array(this.count);
    this.colors = new Float32Array(this.count * 3);

    this.colorsArray = [
        0xa8eaff, // icy blue
        0x66ccff, // light blue
        0x3399ff, // blue
        0x007bff, // classic
        0x0047ab, // deep blue
        0x3f51b5, // indigo
        0x0a192f, // night
      ];
      

    for (let i = 0; i < this.count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 10;

      this.positions[i * 3 + 0] = x;
      this.positions[i * 3 + 1] = y;
      this.positions[i * 3 + 2] = z;

      this.basePositions[i * 3 + 0] = x;
      this.basePositions[i * 3 + 1] = y;
      this.basePositions[i * 3 + 2] = z;

      const hex = this.colorsArray[Math.floor(Math.random() * this.colorsArray.length)];
      const color = new THREE.Color(hex);
      this.colors[i * 3 + 0] = color.r;
      this.colors[i * 3 + 1] = color.g;
      this.colors[i * 3 + 2] = color.b;

      this.sizes[i] = 0.2;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));
    this.geometry.setAttribute("size", new THREE.BufferAttribute(this.sizes, 1));

    this.material = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      map: new THREE.TextureLoader().load(particleTexture),
      alphaTest: 0.01,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.group = new THREE.Group();
    this.group.add(this.points);

    this.mouse = new THREE.Vector2(0, 0);
    this.camera = null;
  }

  setCamera(camera) {
    this.camera = camera;
  }

  setMouse(mouse) {
    this.mouse = mouse;
  }

  update(time) {
    if (!audioController.fdata) return;

    const bass = audioController.fdata[0] / 255;

    for (let i = 0; i < this.count; i++) {
   
      const bx = this.basePositions[i * 3 + 0];
      const by = this.basePositions[i * 3 + 1];
      const bz = this.basePositions[i * 3 + 2];

      let x = bx;
      let y = by;
      let z = bz;
 
      if (this.camera) {
        const vector = new THREE.Vector3(bx, by, bz);
        vector.project(this.camera);

        const dx = vector.x - this.mouse.x;
        const dy = vector.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 0.4) {
          const force = (0.3 - dist) * 55;
          x += dx * force;
          y += dy * force;
        }
      }
 
      const breathing = Math.sin(time * 0.002) * 0.1;
this.material.size = 0.2 + bass * 0.3 + breathing;

      this.positions[i * 3 + 0] = x;
      this.positions[i * 3 + 1] = y;
      this.positions[i * 3 + 2] = z;
    }

    // this.group.rotation.y += 0.001;
this.group.rotation.x += 0.0005;
this.group.rotation.z += 0.0005;


    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.size.needsUpdate = true;
  }
}
