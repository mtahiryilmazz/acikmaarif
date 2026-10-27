import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Web Audio sound effects for each animal
export function playMascotSound(type, animal = 'kedi') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (animal === 'kedi') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.35);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.38);
    } else if (animal === 'kopek') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (animal === 'kus') {
      // Chirping bird sound (two quick high pitch chirps)
      [0, 0.12].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1600, now + offset);
        osc.frequency.exponentialRampToValueAtTime(2400, now + offset + 0.06);
        gain.gain.setValueAtTime(0.14, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.08);
      });
    } else if (animal === 'kaplumbaga') {
      // Soft gentle bubble pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (animal === 'tavsan') {
      // Cute bunny boing spring
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.15);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (animal === 'panda') {
      // Cute panda cheerful chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(350, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (animal === 'anime') {
      // Magic sparkle chime
      const notes = [659.25, 830.61, 987.77, 1318.51];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const start = now + i * 0.06;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.1, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.25);
      });
    }
  } catch (e) {
    // Audio restricted
  }
}

export default function ChibiMascot3D({
  animal = 'kedi', // 'kedi', 'kopek', 'kus', 'kaplumbaga', 'anime'
  colorHex = '#f59e0b',
  scale = 0.55,
  isDocked = true,
  onMascotClick
}) {
  const mountRef = useRef(null);
  const animRef = useRef(null);
  const mascotGroupRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 220;
    const height = container.clientHeight || 220;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Strict transparent clear color
    renderer.domElement.style.backgroundColor = 'transparent';
    renderer.domElement.style.outline = 'none';
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Soft Studio Lighting (Key, Fill, Rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xa5b4fc, 1.0, 15);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xf472b6, 1.5, 15);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // 3. Mascot Group Root
    const mascotGroup = new THREE.Group();
    mascotGroup.scale.set(scale, scale, scale);
    mascotGroup.position.set(0, -0.3, 0);
    scene.add(mascotGroup);
    mascotGroupRef.current = mascotGroup;

    // Materials
    const baseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      roughness: 0.35,
      metalness: 0.05
    });

    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4
    });

    const darkMat = new THREE.MeshBasicMaterial({ color: 0x111827 });
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.3 });
    const eyeHighlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    let movingParts = {
      head: null,
      leftEar: null,
      rightEar: null,
      tail: null,
      leftWing: null,
      rightWing: null,
      limbs: []
    };

    // Helper: Eye with anime catchlight
    const createEye = (x, y, z) => {
      const eyeGroup = new THREE.Group();
      eyeGroup.position.set(x, y, z);

      const eyeSphere = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), darkMat);
      eyeSphere.scale.set(0.6, 1.2, 0.7);
      eyeGroup.add(eyeSphere);

      // Cute white catchlight reflection
      const catchlight = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), eyeHighlightMat);
      catchlight.position.set(0.02, 0.05, 0.08);
      eyeGroup.add(catchlight);

      const catchlight2 = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), eyeHighlightMat);
      catchlight2.position.set(-0.02, -0.04, 0.08);
      eyeGroup.add(catchlight2);

      return eyeGroup;
    };

    // ==========================================
    // ANIMAL 1: KEDİ (Smooth Chibi Kitten)
    // ==========================================
    if (animal === 'kedi') {
      // Body (Cute Rounded Capsule)
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.45, 16, 16), baseMat);
      body.rotation.x = Math.PI / 12;
      body.position.set(0, 0.2, 0);
      mascotGroup.add(body);

      // Belly White Fur
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 16), whiteMat);
      belly.scale.set(0.9, 1.1, 0.5);
      belly.position.set(0, 0.15, 0.25);
      mascotGroup.add(belly);

      // Head
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.85, 0.1);
      mascotGroup.add(headGroup);
      movingParts.head = headGroup;

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), baseMat);
      head.scale.set(1.15, 1.0, 1.05); // Chubby cheeks
      headGroup.add(head);

      // Cheeks (blush)
      const leftBlush = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), pinkMat);
      leftBlush.position.set(-0.35, -0.1, 0.48);
      leftBlush.rotation.y = -Math.PI / 8;
      headGroup.add(leftBlush);

      const rightBlush = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), pinkMat);
      rightBlush.position.set(0.35, -0.1, 0.48);
      rightBlush.rotation.y = Math.PI / 8;
      headGroup.add(rightBlush);

      // Pointy Ears
      const earGeom = new THREE.ConeGeometry(0.2, 0.38, 16);
      const innerEarGeom = new THREE.ConeGeometry(0.13, 0.28, 16);

      const leftEar = new THREE.Mesh(earGeom, baseMat);
      leftEar.position.set(-0.35, 0.52, 0);
      leftEar.rotation.set(-0.1, 0, 0.35);
      headGroup.add(leftEar);
      movingParts.leftEar = leftEar;

      const leftInner = new THREE.Mesh(innerEarGeom, pinkMat);
      leftInner.position.set(-0.34, 0.51, 0.04);
      leftInner.rotation.set(-0.1, 0, 0.35);
      headGroup.add(leftInner);

      const rightEar = new THREE.Mesh(earGeom, baseMat);
      rightEar.position.set(0.35, 0.52, 0);
      rightEar.rotation.set(-0.1, 0, -0.35);
      headGroup.add(rightEar);
      movingParts.rightEar = rightEar;

      const rightInner = new THREE.Mesh(innerEarGeom, pinkMat);
      rightInner.position.set(0.34, 0.51, 0.04);
      rightInner.rotation.set(-0.1, 0, -0.35);
      headGroup.add(rightInner);

      // Eyes
      headGroup.add(createEye(-0.2, 0.05, 0.5));
      headGroup.add(createEye(0.2, 0.05, 0.5));

      // Cute Pink Nose & Mouth
      const nose = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), pinkMat);
      nose.scale.set(1.2, 0.8, 0.8);
      nose.position.set(0, -0.06, 0.56);
      headGroup.add(nose);

      // Whiskers (White lines)
      const whiskerMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
      [-0.04, -0.1].forEach((yOffset) => {
        const leftPoints = [new THREE.Vector3(-0.15, yOffset, 0.52), new THREE.Vector3(-0.55, yOffset + 0.02, 0.45)];
        const leftLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(leftPoints), whiskerMat);
        headGroup.add(leftLine);

        const rightPoints = [new THREE.Vector3(0.15, yOffset, 0.52), new THREE.Vector3(0.55, yOffset + 0.02, 0.45)];
        const rightLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(rightPoints), whiskerMat);
        headGroup.add(rightLine);
      });

      // 4 Cute Paws
      const pawGeom = new THREE.SphereGeometry(0.16, 16, 16);
      const createPaw = (x, y, z) => {
        const paw = new THREE.Mesh(pawGeom, whiteMat);
        paw.scale.set(1.0, 0.7, 1.2);
        paw.position.set(x, y, z);
        mascotGroup.add(paw);
        return paw;
      };
      movingParts.limbs.push(createPaw(-0.22, -0.22, 0.28));
      movingParts.limbs.push(createPaw(0.22, -0.22, 0.28));
      movingParts.limbs.push(createPaw(-0.3, -0.22, -0.15));
      movingParts.limbs.push(createPaw(0.3, -0.22, -0.15));

      // Tail
      const tailGroup = new THREE.Group();
      tailGroup.position.set(0, 0.1, -0.38);
      mascotGroup.add(tailGroup);
      movingParts.tail = tailGroup;

      const tailMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.7, 16), baseMat);
      tailMesh.position.set(0, 0.35, -0.15);
      tailMesh.rotation.x = -Math.PI / 4;
      tailGroup.add(tailMesh);
    }

    // ==========================================
    // ANIMAL 2: KÖPEK (Cute Floppy-Eared Puppy)
    // ==========================================
    else if (animal === 'kopek') {
      // Body
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.44, 0.5, 16, 16), baseMat);
      body.position.set(0, 0.2, 0);
      mascotGroup.add(body);

      // Belly
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 16), whiteMat);
      belly.scale.set(0.9, 1.1, 0.5);
      belly.position.set(0, 0.15, 0.28);
      mascotGroup.add(belly);

      // Head
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.88, 0.1);
      mascotGroup.add(headGroup);
      movingParts.head = headGroup;

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.56, 32, 32), baseMat);
      headGroup.add(head);

      // Snout (Muzzle)
      const snout = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), whiteMat);
      snout.scale.set(1.2, 0.9, 1.1);
      snout.position.set(0, -0.1, 0.42);
      headGroup.add(snout);

      // Nose
      const nose = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), darkMat);
      nose.position.set(0, -0.04, 0.65);
      headGroup.add(nose);

      // Floppy Ears
      const earGeom = new THREE.CapsuleGeometry(0.16, 0.45, 12, 12);
      const earMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex).multiplyScalar(0.75),
        roughness: 0.4
      });

      const leftEar = new THREE.Mesh(earGeom, earMat);
      leftEar.position.set(-0.48, 0.18, 0.05);
      leftEar.rotation.set(0.1, 0, 0.3);
      headGroup.add(leftEar);
      movingParts.leftEar = leftEar;

      const rightEar = new THREE.Mesh(earGeom, earMat);
      rightEar.position.set(0.48, 0.18, 0.05);
      rightEar.rotation.set(0.1, 0, -0.3);
      headGroup.add(rightEar);
      movingParts.rightEar = rightEar;

      // Eyes
      headGroup.add(createEye(-0.2, 0.08, 0.52));
      headGroup.add(createEye(0.2, 0.08, 0.52));

      // Collar
      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.06, 8, 24), new THREE.MeshStandardMaterial({ color: 0x3b82f6 }));
      collar.position.set(0, 0.5, 0.08);
      collar.rotation.x = Math.PI / 2;
      mascotGroup.add(collar);

      // Paws
      const pawGeom = new THREE.SphereGeometry(0.18, 16, 16);
      const createPaw = (x, y, z) => {
        const paw = new THREE.Mesh(pawGeom, whiteMat);
        paw.scale.set(1.0, 0.7, 1.2);
        paw.position.set(x, y, z);
        mascotGroup.add(paw);
        return paw;
      };
      movingParts.limbs.push(createPaw(-0.22, -0.22, 0.3));
      movingParts.limbs.push(createPaw(0.22, -0.22, 0.3));
      movingParts.limbs.push(createPaw(-0.3, -0.22, -0.15));
      movingParts.limbs.push(createPaw(0.3, -0.22, -0.15));

      // Wagging Tail
      const tailGroup = new THREE.Group();
      tailGroup.position.set(0, 0.15, -0.38);
      mascotGroup.add(tailGroup);
      movingParts.tail = tailGroup;

      const tailMesh = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.5, 12), earMat);
      tailMesh.position.set(0, 0.25, -0.1);
      tailMesh.rotation.x = -Math.PI / 3;
      tailGroup.add(tailMesh);
    }

    // ==========================================
    // ANIMAL 3: KUŞ (Chibi Bird / Papağan)
    // ==========================================
    else if (animal === 'kus') {
      // 1. Plump Oval Body
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.48, 32, 32), baseMat);
      body.scale.set(0.9, 0.95, 1.15);
      body.position.set(0, 0.22, 0);
      mascotGroup.add(body);

      // 2. Pastel Yellow/Cream Fluffy Chest & Belly
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 24), new THREE.MeshStandardMaterial({ 
        color: 0xfef08a, 
        roughness: 0.35 
      }));
      belly.scale.set(0.85, 0.9, 0.6);
      belly.position.set(0, 0.18, 0.32);
      mascotGroup.add(belly);

      // 3. Cute Distinct Round Bird Head
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.68, 0.18);
      mascotGroup.add(headGroup);
      movingParts.head = headGroup;

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.44, 32, 32), baseMat);
      head.scale.set(1.05, 1.0, 1.05);
      headGroup.add(head);

      // Rosy Pink Cheeks
      const leftBlush = new THREE.Mesh(new THREE.CircleGeometry(0.08, 16), pinkMat);
      leftBlush.position.set(-0.28, -0.06, 0.38);
      leftBlush.rotation.y = -Math.PI / 6;
      headGroup.add(leftBlush);

      const rightBlush = new THREE.Mesh(new THREE.CircleGeometry(0.08, 16), pinkMat);
      rightBlush.position.set(0.28, -0.06, 0.38);
      rightBlush.rotation.y = Math.PI / 6;
      headGroup.add(rightBlush);

      // 4. Prominent Golden Bird Beak (Gaga - net, sevimli ve belirgin)
      const beakMat = new THREE.MeshStandardMaterial({ 
        color: 0xf59e0b, 
        roughness: 0.25, 
        metalness: 0.1 
      });
      // Upper beak (curved triangle)
      const upperBeak = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.32, 16), beakMat);
      upperBeak.rotation.x = Math.PI / 2 + 0.1;
      upperBeak.position.set(0, -0.02, 0.52);
      headGroup.add(upperBeak);

      // Lower beak
      const lowerBeak = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.22, 16), beakMat);
      lowerBeak.rotation.x = Math.PI / 2 - 0.15;
      lowerBeak.position.set(0, -0.09, 0.48);
      headGroup.add(lowerBeak);

      // 5. Big Expressive Anime Eyes
      headGroup.add(createEye(-0.2, 0.12, 0.4));
      headGroup.add(createEye(0.2, 0.12, 0.4));

      // 6. Triple Crest Feathers (Kuşun tepesindeki sevimli sorguç tüyleri)
      const crestColors = [0xf43f5e, 0xf59e0b, 0x38bdf8];
      [-0.08, 0, 0.08].forEach((xOff, i) => {
        const crestFeather = new THREE.Mesh(
          new THREE.ConeGeometry(0.06, 0.35 + i * 0.05, 12),
          new THREE.MeshStandardMaterial({ color: crestColors[i], roughness: 0.3 })
        );
        crestFeather.position.set(xOff, 0.52, -0.02 + Math.abs(xOff));
        crestFeather.rotation.set(-0.25, 0, xOff * -2);
        headGroup.add(crestFeather);
      });

      // 7. Wide Feathered Wings (Left & Right - gerçekçi kanat çırpma açısı)
      const wingMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex).multiplyScalar(0.9),
        roughness: 0.35
      });

      // Wing pivot joints for graceful flapping
      const leftWingGroup = new THREE.Group();
      leftWingGroup.position.set(-0.42, 0.32, 0.05);
      mascotGroup.add(leftWingGroup);
      movingParts.leftWing = leftWingGroup;

      const leftWingMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.52, 12, 12), wingMat);
      leftWingMesh.scale.set(0.6, 1.0, 1.4);
      leftWingMesh.position.set(-0.22, 0, 0);
      leftWingMesh.rotation.set(0.1, 0, 0.6);
      leftWingGroup.add(leftWingMesh);

      const rightWingGroup = new THREE.Group();
      rightWingGroup.position.set(0.42, 0.32, 0.05);
      mascotGroup.add(rightWingGroup);
      movingParts.rightWing = rightWingGroup;

      const rightWingMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.52, 12, 12), wingMat);
      rightWingMesh.scale.set(0.6, 1.0, 1.4);
      rightWingMesh.position.set(0.22, 0, 0);
      rightWingMesh.rotation.set(0.1, 0, -0.6);
      rightWingGroup.add(rightWingMesh);

      // 8. Fan Tail Feathers (Yelpaze Kuyruk)
      const tailFeatherMat = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color(colorHex).multiplyScalar(0.8),
        roughness: 0.3 
      });
      const tailGroup = new THREE.Group();
      tailGroup.position.set(0, 0.18, -0.5);
      mascotGroup.add(tailGroup);
      movingParts.tail = tailGroup;

      [-0.12, 0, 0.12].forEach((xOff) => {
        const tf = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.45), tailFeatherMat);
        tf.position.set(xOff, 0.05, -0.15);
        tf.rotation.set(-0.25, xOff * 1.5, 0);
        tailGroup.add(tf);
      });

      // 9. Tiny Golden Perching Claws/Feet
      const footMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
      const leftFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.18, 8), footMat);
      leftFoot.position.set(-0.14, -0.2, 0.05);
      leftFoot.rotation.x = 0.2;
      mascotGroup.add(leftFoot);

      const rightFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.18, 8), footMat);
      rightFoot.position.set(0.14, -0.2, 0.05);
      rightFoot.rotation.x = 0.2;
      mascotGroup.add(rightFoot);
    }

    // ==========================================
    // ANIMAL 4: KAPLUMBAĞA (Chibi Turtle Tosbik)
    // ==========================================
    else if (animal === 'kaplumbaga') {
      // Shell (Dome)
      const shellMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex).multiplyScalar(0.7),
        roughness: 0.45
      });
      const shell = new THREE.Mesh(new THREE.SphereGeometry(0.65, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), shellMat);
      shell.scale.set(1.0, 0.8, 1.15);
      shell.position.set(0, 0.3, 0);
      mascotGroup.add(shell);

      // Shell Rim (Torus ring around base)
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.66, 0.08, 12, 32), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
      rim.rotation.x = Math.PI / 2;
      rim.position.set(0, 0.3, 0);
      rim.scale.set(1.0, 1.15, 1.0);
      mascotGroup.add(rim);

      // Head Group (pokes out from shell)
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.38, 0.72);
      mascotGroup.add(headGroup);
      movingParts.head = headGroup;

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 24), baseMat);
      head.scale.set(1.0, 0.9, 1.1);
      headGroup.add(head);

      // Eyes
      headGroup.add(createEye(-0.16, 0.08, 0.26));
      headGroup.add(createEye(0.16, 0.08, 0.26));

      // 4 Flippers / Legs
      const legGeom = new THREE.SphereGeometry(0.18, 16, 16);
      const createLeg = (x, y, z) => {
        const leg = new THREE.Mesh(legGeom, baseMat);
        leg.scale.set(1.2, 0.6, 1.3);
        leg.position.set(x, y, z);
        mascotGroup.add(leg);
        return leg;
      };
      movingParts.limbs.push(createLeg(-0.45, 0.18, 0.42));
      movingParts.limbs.push(createLeg(0.45, 0.18, 0.42));
      movingParts.limbs.push(createLeg(-0.45, 0.18, -0.42));
      movingParts.limbs.push(createLeg(0.45, 0.18, -0.42));

      // Tiny tail
      const tail = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 12), baseMat);
      tail.rotation.x = -Math.PI / 2;
      tail.position.set(0, 0.25, -0.75);
      mascotGroup.add(tail);
      movingParts.tail = tail;
    }

    // ==========================================
    // ANIMAL 5: ANIME MENTOR (Chibi Anime Karakteri)
    // ==========================================
    else if (animal === 'anime') {
      // Body with Cape / School Scarf
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.48, 16, 16), new THREE.MeshStandardMaterial({ color: 0x1e1b4b }));
      body.position.set(0, 0.2, 0);
      mascotGroup.add(body);

      // Scarf
      const scarf = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.08, 8, 24), new THREE.MeshStandardMaterial({ color: 0xf43f5e }));
      scarf.position.set(0, 0.55, 0.02);
      scarf.rotation.x = Math.PI / 2;
      mascotGroup.add(scarf);

      // Head (Big Anime Chibi Head)
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.95, 0.05);
      mascotGroup.add(headGroup);
      movingParts.head = headGroup;

      const skinMat = new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.4 });
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.56, 32, 32), skinMat);
      head.scale.set(1.05, 0.95, 1.05);
      headGroup.add(head);

      // Anime Hair (Spikes / Twin Tufts)
      const hairMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(colorHex), roughness: 0.3 });
      
      // Top hair helmet
      const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.58, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2), hairMat);
      hairTop.position.set(0, 0.05, 0);
      headGroup.add(hairTop);

      // Front Bangs
      for (let i = -3; i <= 3; i++) {
        const bang = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 4), hairMat);
        bang.position.set(i * 0.12, 0.32, 0.52);
        bang.rotation.set(0.4, 0, (i * 0.1));
        headGroup.add(bang);
      }

      // Twin Tails / Side Tufts
      const leftPony = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.65, 8), hairMat);
      leftPony.position.set(-0.55, 0.1, -0.1);
      leftPony.rotation.set(-0.2, 0, 0.6);
      headGroup.add(leftPony);
      movingParts.leftEar = leftPony;

      const rightPony = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.65, 8), hairMat);
      rightPony.position.set(0.55, 0.1, -0.1);
      rightPony.rotation.set(-0.2, 0, -0.6);
      headGroup.add(rightPony);
      movingParts.rightEar = rightPony;

      // Anime Big Eyes
      headGroup.add(createEye(-0.2, 0.05, 0.5));
      headGroup.add(createEye(0.2, 0.05, 0.5));

      // Star Hairpin
      const star = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.12, 5), new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.7 }));
      star.position.set(-0.35, 0.45, 0.42);
      star.rotation.z = Math.PI / 5;
      headGroup.add(star);
    }

    // ==========================================
    // ANIMAL 6: TAVŞAN (Chibi Bunny Pamuk)
    // ==========================================
    else if (animal === 'tavsan') {
      // Chubby round Body
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.46, 24, 24), baseMat);
      body.scale.set(0.95, 1.1, 1.0);
      body.position.set(0, 0.25, 0);
      mascotGroup.add(body);

      // Fluffy White Belly
      const belly = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), whiteMat);
      belly.scale.set(0.9, 1.05, 0.5);
      belly.position.set(0, 0.22, 0.28);
      mascotGroup.add(belly);

      // Head
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.9, 0.05);
      mascotGroup.add(headGroup);
      movingParts.head = headGroup;

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.54, 32, 32), baseMat);
      head.scale.set(1.15, 0.95, 1.05);
      headGroup.add(head);

      // Cheeks (blush)
      const leftBlush = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), pinkMat);
      leftBlush.position.set(-0.32, -0.1, 0.48);
      leftBlush.rotation.y = -Math.PI / 8;
      headGroup.add(leftBlush);

      const rightBlush = new THREE.Mesh(new THREE.CircleGeometry(0.1, 16), pinkMat);
      rightBlush.position.set(0.32, -0.1, 0.48);
      rightBlush.rotation.y = Math.PI / 8;
      headGroup.add(rightBlush);

      // Long Bouncy Ears
      const earGeom = new THREE.CapsuleGeometry(0.12, 0.75, 12, 12);
      const innerEarGeom = new THREE.CapsuleGeometry(0.08, 0.55, 12, 12);

      const leftEar = new THREE.Mesh(earGeom, baseMat);
      leftEar.position.set(-0.25, 0.72, -0.05);
      leftEar.rotation.set(-0.1, 0, 0.15);
      headGroup.add(leftEar);
      movingParts.leftEar = leftEar;

      const leftInner = new THREE.Mesh(innerEarGeom, pinkMat);
      leftInner.position.set(-0.25, 0.7, 0.02);
      leftInner.rotation.set(-0.1, 0, 0.15);
      headGroup.add(leftInner);

      const rightEar = new THREE.Mesh(earGeom, baseMat);
      rightEar.position.set(0.25, 0.72, -0.05);
      rightEar.rotation.set(-0.1, 0, -0.15);
      headGroup.add(rightEar);
      movingParts.rightEar = rightEar;

      const rightInner = new THREE.Mesh(innerEarGeom, pinkMat);
      rightInner.position.set(0.25, 0.7, 0.02);
      rightInner.rotation.set(-0.1, 0, -0.15);
      headGroup.add(rightInner);

      // Eyes
      headGroup.add(createEye(-0.2, 0.05, 0.5));
      headGroup.add(createEye(0.2, 0.05, 0.5));

      // Pink Nose
      const nose = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), pinkMat);
      nose.position.set(0, -0.08, 0.55);
      headGroup.add(nose);

      // Fluffy round Tail
      const tail = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), whiteMat);
      tail.position.set(0, 0.15, -0.45);
      mascotGroup.add(tail);
      movingParts.tail = tail;

      // Cute Little Carrot held in hands
      const carrotGroup = new THREE.Group();
      carrotGroup.position.set(0.15, 0.1, 0.38);
      carrotGroup.rotation.set(0.4, 0.2, -0.5);
      
      const carrot = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.35, 12), new THREE.MeshStandardMaterial({ color: 0xf97316 }));
      carrot.rotation.x = Math.PI;
      carrotGroup.add(carrot);

      const carrotLeaves = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.2, 6), new THREE.MeshStandardMaterial({ color: 0x22c55e }));
      carrotLeaves.position.set(0, 0.22, 0);
      carrotGroup.add(carrotLeaves);
      mascotGroup.add(carrotGroup);

      // Paws
      const pawGeom = new THREE.SphereGeometry(0.15, 16, 16);
      const createPaw = (x, y, z) => {
        const paw = new THREE.Mesh(pawGeom, whiteMat);
        paw.scale.set(1.0, 0.7, 1.2);
        paw.position.set(x, y, z);
        mascotGroup.add(paw);
        return paw;
      };
      movingParts.limbs.push(createPaw(-0.22, -0.18, 0.22));
      movingParts.limbs.push(createPaw(0.22, -0.18, 0.22));
    }

    // ==========================================
    // ANIMAL 7: PANDA (Chibi Panda Tonton)
    // ==========================================
    else if (animal === 'panda') {
      // Body (White with black arms/legs)
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.52, 24, 24), whiteMat);
      body.position.set(0, 0.22, 0);
      mascotGroup.add(body);

      // Black shoulder band/vest
      const vest = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.12, 12, 32), darkMat);
      vest.rotation.x = Math.PI / 2;
      vest.position.set(0, 0.38, 0);
      mascotGroup.add(vest);

      // Head (Chubby White Sphere)
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 0.9, 0.05);
      mascotGroup.add(headGroup);
      movingParts.head = headGroup;

      const head = new THREE.Mesh(new THREE.SphereGeometry(0.58, 32, 32), whiteMat);
      head.scale.set(1.15, 0.95, 1.05);
      headGroup.add(head);

      // Black Oval Eye Patches
      const patchGeom = new THREE.CapsuleGeometry(0.12, 0.14, 12, 12);
      
      const leftPatch = new THREE.Mesh(patchGeom, darkMat);
      leftPatch.position.set(-0.22, 0.06, 0.5);
      leftPatch.rotation.set(0.1, 0, 0.35);
      headGroup.add(leftPatch);

      const rightPatch = new THREE.Mesh(patchGeom, darkMat);
      rightPatch.position.set(0.22, 0.06, 0.5);
      rightPatch.rotation.set(0.1, 0, -0.35);
      headGroup.add(rightPatch);

      // Eyes
      headGroup.add(createEye(-0.22, 0.06, 0.56));
      headGroup.add(createEye(0.22, 0.06, 0.56));

      // Black Round Ears
      const earGeom = new THREE.SphereGeometry(0.18, 16, 16);
      
      const leftEar = new THREE.Mesh(earGeom, darkMat);
      leftEar.position.set(-0.45, 0.48, 0);
      headGroup.add(leftEar);
      movingParts.leftEar = leftEar;

      const rightEar = new THREE.Mesh(earGeom, darkMat);
      rightEar.position.set(0.45, 0.48, 0);
      headGroup.add(rightEar);
      movingParts.rightEar = rightEar;

      // Black Nose
      const nose = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), darkMat);
      nose.scale.set(1.2, 0.8, 0.8);
      nose.position.set(0, -0.06, 0.58);
      headGroup.add(nose);

      // Black Paws
      const pawGeom = new THREE.SphereGeometry(0.18, 16, 16);
      const createPaw = (x, y, z) => {
        const paw = new THREE.Mesh(pawGeom, darkMat);
        paw.scale.set(1.0, 0.8, 1.2);
        paw.position.set(x, y, z);
        mascotGroup.add(paw);
        return paw;
      };
      movingParts.limbs.push(createPaw(-0.35, 0.15, 0.28));
      movingParts.limbs.push(createPaw(0.35, 0.15, 0.28));
      movingParts.limbs.push(createPaw(-0.25, -0.22, 0.2));
      movingParts.limbs.push(createPaw(0.25, -0.22, 0.2));

      // Bamboo Stalk held in hand
      const bambooGroup = new THREE.Group();
      bambooGroup.position.set(0.42, 0.35, 0.35);
      bambooGroup.rotation.z = -0.3;

      const bambooMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.3 });
      const bamboo = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 12), bambooMat);
      bambooGroup.add(bamboo);

      // Bamboo nodes
      for (let i = -1; i <= 1; i++) {
        const node = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.015, 8, 16), new THREE.MeshStandardMaterial({ color: 0x15803d }));
        node.position.y = i * 0.25;
        node.rotation.x = Math.PI / 2;
        bambooGroup.add(node);
      }
      mascotGroup.add(bambooGroup);
    }

    // 4. Animation Loop using Clock
    const clock = new THREE.Clock();

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gentle floating/breathing bobbing
      mascotGroup.position.y = -0.3 + Math.sin(elapsed * 2.5) * 0.08;
      mascotGroup.rotation.y = Math.sin(elapsed * 1.2) * 0.18;

      // Head tracking and tilting
      if (movingParts.head) {
        movingParts.head.rotation.z = Math.sin(elapsed * 2.0) * 0.08;
        movingParts.head.rotation.x = Math.sin(elapsed * 1.5) * 0.05;
      }

      // Tail wagging
      if (movingParts.tail) {
        movingParts.tail.rotation.y = Math.sin(elapsed * 6.0) * 0.45;
        movingParts.tail.rotation.z = Math.cos(elapsed * 3.0) * 0.2;
      }

      // Ears twitching
      if (movingParts.leftEar && movingParts.rightEar) {
        movingParts.leftEar.rotation.x = Math.sin(elapsed * 4.0) * 0.1;
        movingParts.rightEar.rotation.x = Math.cos(elapsed * 4.0) * 0.1;
      }

      // Wings flapping for bird (Zarif, sakin ve doğal kanat süzülüşü)
      if (movingParts.leftWing && movingParts.rightWing) {
        const flap = Math.sin(elapsed * 3.6);
        movingParts.leftWing.rotation.z = 0.3 + flap * 0.45;
        movingParts.rightWing.rotation.z = -0.3 - flap * 0.45;
        // Subtle aerodynamic lift angle
        movingParts.leftWing.rotation.x = Math.cos(elapsed * 1.8) * 0.12;
        movingParts.rightWing.rotation.x = Math.cos(elapsed * 1.8) * 0.12;
      }

      // Limbs paddle/sway
      movingParts.limbs.forEach((limb, i) => {
        limb.rotation.z = Math.sin(elapsed * 3.0 + i) * 0.12;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [animal, colorHex]);

  // Live smooth scale adjustment without tearing down or flickering WebGL canvas
  useEffect(() => {
    if (mascotGroupRef.current) {
      mascotGroupRef.current.scale.set(scale, scale, scale);
    }
  }, [scale]);

  return (
    <div
      ref={mountRef}
      onClick={() => {
        playMascotSound('click', animal);
        if (onMascotClick) onMascotClick();
      }}
      className="cursor-pointer select-none hover:scale-105 active:scale-95 transition-transform duration-200"
      title="Bana tıkla sevimli ses çıkarayım! 🐾"
      style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
    />
  );
}
