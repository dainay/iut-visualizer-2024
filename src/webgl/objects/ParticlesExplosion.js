import * as THREE from "three";
import audioController from "../../utils/AudioController";
import particleTexture from "../../assets/disc.png";


export default class ParticlesExplosion {
  constructor() {
    this.count = 1000;

    this.positions = new Float32Array(this.count * 3);
    this.velocities = new Float32Array(this.count * 3);
    this.colors = new Float32Array(this.count * 3);

    this.colorsArray = [
        0xfce2b9, 
        0xf6d6a2,
        0xe9c46a, 
        0xcfa570,
        0xa47148, 
        0x7b4b2a,
        0x4e342e,
      ];

    for (let i = 0; i < this.count; i++) {
    
      this.positions[i * 3 + 0] = 0;
      this.positions[i * 3 + 1] = 0;
      this.positions[i * 3 + 2] = 0;
 
      this.velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.2;
      this.velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      this.velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;

   
      const hex = this.colorsArray[Math.floor(Math.random() * this.colorsArray.length)];
      const color = new THREE.Color(hex);
      this.colors[i * 3 + 0] = color.r;
      this.colors[i * 3 + 1] = color.g;
      this.colors[i * 3 + 2] = color.b;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute("color", new THREE.BufferAttribute(this.colors, 3));

    this.material = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        map: new THREE.TextureLoader().load(particleTexture),
        alphaTest: 0.01,  
      });
      

    this.group = new THREE.Group();

    this.points = new THREE.Points(this.geometry, this.material);
    this.group.add(this.points);

    this.camera = null;  
  }

  setCamera(camera) {
    this.camera = camera;
  }

  update(time, deltaTime) {
    if (!audioController.fdata) return;
    const boost = (audioController.fdata[0] / 255) * 0.5;

    for (let i = 0; i < this.count; i++) {
      this.positions[i * 3 + 0] += this.velocities[i * 3 + 0] * boost;
      this.positions[i * 3 + 1] += this.velocities[i * 3 + 1] * boost;
      this.positions[i * 3 + 2] += this.velocities[i * 3 + 2] * boost;

     
      const x = this.positions[i * 3 + 0];
      const y = this.positions[i * 3 + 1];
      const z = this.positions[i * 3 + 2];
      if (x * x + y * y + z * z > 100) {
        this.positions[i * 3 + 0] = 0;
        this.positions[i * 3 + 1] = 0;
        this.positions[i * 3 + 2] = 0;
      }
    }

    this.geometry.attributes.position.needsUpdate = true;
 
    if (this.camera) {
      const distance = 15 - (audioController.fdata[0] / 255) * 4;
      this.camera.position.z = distance;
    }
  }
}
