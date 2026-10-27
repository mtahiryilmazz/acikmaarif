import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Synthesize pleasant, playful cat sounds via Web Audio API (Zero external file dependencies)
function playCatSound(type = 'meow') {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    if (type === 'meow') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.14);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.38);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    } else if (type === 'purr') {
      // Gentle purring sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(45, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'jump') {
      // Bouncy spring sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    }
  } catch (e) {
    // Audio restricted before user gesture
  }
}

export default function ThreeCatMascot({ onCatAction }) {
  const mountRef = useRef(null);
  const [speech, setSpeech] = useState("Miyav! Ben Minnoş! 🐾 Menülere tırmanmaya bayılırım!");
  const [showSpeech, setShowSpeech] = useState(true);
  const [bubblePos, setBubblePos] = useState({ x: 100, y: 100 });
  const [currentActionName, setCurrentActionName] = useState('Yürüyor');

  const catStateRef = useRef({
    action: 'walk', // 'walk', 'climb', 'jump', 'sit'
    posX: 0,
    posY: -2.0,
    targetX: 3.0,
    targetY: -2.0,
    facing: 1,
    jumpProgress: 0,
    isJumping: false,
    speed: 1.2
  });

  const catSpeechPool = [
    "Miyav! Şekilleri ve renkleri keşfedelim mi? 🔴🔺",
    "Hoppala! Menünün üzerine tırmandım! 🐾",
    "Bana tıkla, senin için havada takla atayım! 🤸‍♂️",
    "Aferin sana! 1'den 10'a kadar sayabiliyor musun? 🔢",
    "Mırrr... Öğrenmek ne kadar eğlenceli! 💖",
    "Yeşil üçgeni gördün mü? Çok tatlı! 🔺"
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer (Transparent WebGL)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Warm and soft for preschool feel)
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(0xff69b4, 1.2, 20);
    rimLight.position.set(-5, 4, 3);
    scene.add(rimLight);

    // 3. Build Stylized 3D Cat Model using Group & Materials
    const catGroup = new THREE.Group();
    scene.add(catGroup);

    // Materials
    const furColor = 0xf59e0b; // Cute warm ginger orange
    const bellyColor = 0xfffbeb; // Soft cream white
    const noseColor = 0xf472b6; // Cute pink nose
    const eyeColor = 0x10b981; // Sparkling emerald green
    const pupilColor = 0x0f172a;
    const collarColor = 0xef4444; // Red collar
    const bellColor = 0xfacc15; // Golden bell

    const furMat = new THREE.MeshStandardMaterial({ 
      color: furColor, 
      roughness: 0.4, 
      metalness: 0.05 
    });
    const bellyMat = new THREE.MeshStandardMaterial({ 
      color: bellyColor, 
      roughness: 0.5 
    });
    const pinkMat = new THREE.MeshStandardMaterial({ 
      color: noseColor, 
      roughness: 0.3 
    });
    const eyeMat = new THREE.MeshStandardMaterial({ 
      color: eyeColor, 
      roughness: 0.1, 
      metalness: 0.1 
    });
    const pupilMat = new THREE.MeshBasicMaterial({ color: pupilColor });
    const collarMat = new THREE.MeshStandardMaterial({ color: collarColor, roughness: 0.3 });
    const bellMat = new THREE.MeshStandardMaterial({ color: bellColor, metalness: 0.7, roughness: 0.2 });

    // Body (Rounded Capsule / Cylinder)
    const bodyGeom = new THREE.CylinderGeometry(0.55, 0.65, 1.3, 16);
    const body = new THREE.Mesh(bodyGeom, furMat);
    body.rotation.z = Math.PI / 2;
    body.position.set(0, 0.4, 0);
    catGroup.add(body);

    // Cute Belly patch
    const bellyGeom = new THREE.SphereGeometry(0.52, 16, 16);
    const belly = new THREE.Mesh(bellyGeom, bellyMat);
    belly.scale.set(1.2, 0.9, 0.7);
    belly.position.set(0, 0.32, 0.2);
    catGroup.add(belly);

    // Head Group
    const headGroup = new THREE.Group();
    headGroup.position.set(0.75, 0.95, 0);
    catGroup.add(headGroup);

    // Head Sphere
    const headGeom = new THREE.SphereGeometry(0.55, 24, 24);
    const head = new THREE.Mesh(headGeom, furMat);
    headGroup.add(head);

    // Snout
    const snoutGeom = new THREE.SphereGeometry(0.24, 16, 16);
    const snout = new THREE.Mesh(snoutGeom, bellyMat);
    snout.scale.set(1.2, 0.8, 1);
    snout.position.set(0.35, -0.1, 0);
    headGroup.add(snout);

    // Nose
    const noseGeom = new THREE.ConeGeometry(0.08, 0.08, 3);
    const nose = new THREE.Mesh(noseGeom, pinkMat);
    nose.rotation.z = -Math.PI / 2;
    nose.position.set(0.52, -0.05, 0);
    headGroup.add(nose);

    // Ears (Pointy Cones)
    const earGeom = new THREE.ConeGeometry(0.22, 0.4, 4);
    
    const leftEar = new THREE.Mesh(earGeom, furMat);
    leftEar.position.set(0.1, 0.5, 0.3);
    leftEar.rotation.set(-0.2, 0, -0.3);
    headGroup.add(leftEar);

    const leftInnerEar = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.28, 4), pinkMat);
    leftInnerEar.position.set(0.14, 0.48, 0.3);
    leftInnerEar.rotation.set(-0.2, 0, -0.3);
    headGroup.add(leftInnerEar);

    const rightEar = new THREE.Mesh(earGeom, furMat);
    rightEar.position.set(0.1, 0.5, -0.3);
    rightEar.rotation.set(0.2, 0, -0.3);
    headGroup.add(rightEar);

    const rightInnerEar = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.28, 4), pinkMat);
    rightInnerEar.position.set(0.14, 0.48, -0.3);
    rightInnerEar.rotation.set(0.2, 0, -0.3);
    headGroup.add(rightInnerEar);

    // Eyes (Big sparkling cute cat eyes)
    const eyeGeom = new THREE.SphereGeometry(0.14, 16, 16);
    const pupilGeom = new THREE.SphereGeometry(0.08, 16, 16);

    // Left Eye
    const leftEye = new THREE.Mesh(eyeGeom, eyeMat);
    leftEye.scale.set(0.6, 1.2, 1);
    leftEye.position.set(0.42, 0.08, 0.24);
    headGroup.add(leftEye);

    const leftPupil = new THREE.Mesh(pupilGeom, pupilMat);
    leftPupil.scale.set(0.4, 1.2, 0.5);
    leftPupil.position.set(0.48, 0.08, 0.25);
    headGroup.add(leftPupil);

    // Right Eye
    const rightEye = new THREE.Mesh(eyeGeom, eyeMat);
    rightEye.scale.set(0.6, 1.2, 1);
    rightEye.position.set(0.42, 0.08, -0.24);
    headGroup.add(rightEye);

    const rightPupil = new THREE.Mesh(pupilGeom, pupilMat);
    rightPupil.scale.set(0.4, 1.2, 0.5);
    rightPupil.position.set(0.48, 0.08, -0.25);
    headGroup.add(rightPupil);

    // Collar & Bell
    const collarGeom = new THREE.TorusGeometry(0.48, 0.06, 8, 24);
    const collar = new THREE.Mesh(collarGeom, collarMat);
    collar.position.set(0.45, 0.62, 0);
    collar.rotation.y = Math.PI / 2;
    catGroup.add(collar);

    const bellGeom = new THREE.SphereGeometry(0.1, 12, 12);
    const bell = new THREE.Mesh(bellGeom, bellMat);
    bell.position.set(0.62, 0.52, 0);
    catGroup.add(bell);

    // 4 Articulated Legs
    const legGeom = new THREE.CylinderGeometry(0.14, 0.12, 0.65, 12);
    const pawGeom = new THREE.SphereGeometry(0.16, 12, 12);

    const createLeg = (x, z) => {
      const legGroup = new THREE.Group();
      legGroup.position.set(x, 0.3, z);
      
      const leg = new THREE.Mesh(legGeom, furMat);
      leg.position.set(0, -0.25, 0);
      legGroup.add(leg);

      const paw = new THREE.Mesh(pawGeom, bellyMat);
      paw.scale.set(1.1, 0.6, 1.1);
      paw.position.set(0.04, -0.55, 0);
      legGroup.add(paw);

      catGroup.add(legGroup);
      return legGroup;
    };

    const frontLeftLeg = createLeg(0.45, 0.32);
    const frontRightLeg = createLeg(0.45, -0.32);
    const backLeftLeg = createLeg(-0.45, 0.32);
    const backRightLeg = createLeg(-0.45, -0.32);

    // Articulated Tail
    const tailGroup = new THREE.Group();
    tailGroup.position.set(-0.65, 0.55, 0);
    catGroup.add(tailGroup);

    const tailPart1 = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.6, 12), furMat);
    tailPart1.position.set(-0.25, 0.25, 0);
    tailPart1.rotation.z = -Math.PI / 3;
    tailGroup.add(tailPart1);

    const tailPart2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.5, 12), bellyMat);
    tailPart2.position.set(-0.5, 0.55, 0);
    tailPart2.rotation.z = -Math.PI / 5;
    tailGroup.add(tailPart2);

    // Initial scale and position
    catGroup.scale.set(0.95, 0.95, 0.95);
    catGroup.position.set(0, -2.0, 0);

    // Raycasting for interactive click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const triggerCatJump = (targetX = null, targetY = null) => {
      const st = catStateRef.current;
      playCatSound('jump');
      st.isJumping = true;
      st.jumpProgress = 0;
      st.action = 'jump';
      setCurrentActionName('Zıplıyor & Tırmanıyor! 🚀');

      if (targetX !== null) {
        st.targetX = targetX;
      } else {
        // Climb to top menu or random high position
        st.targetX = (Math.random() - 0.5) * 8;
        st.targetY = st.targetY < 0 ? (Math.random() * 2.2 + 0.5) : -2.0; // Toggle between ground & top menu
      }

      // Pick cheerful random speech
      const randomText = catSpeechPool[Math.floor(Math.random() * catSpeechPool.length)];
      setSpeech(randomText);
      setShowSpeech(true);
    };

    const handlePointerDown = (e) => {
      // Do not intercept clicks on real UI buttons, dropdowns, inputs or navbars
      if (e.target && e.target.closest('button, select, input, a, nav, textarea, [role="button"]')) {
        return;
      }

      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(catGroup.children, true);

      if (intersects.length > 0) {
        // Direct click on the 3D cat!
        playCatSound('meow');
        triggerCatJump();
      } else {
        // Click on background space to tell cat to run/climb there
        const worldTargetX = mouse.x * 5.5;
        const worldTargetY = Math.max(-2.2, Math.min(2.5, mouse.y * 3.5));
        triggerCatJump(worldTargetX, worldTargetY);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

    // Periodic automatic wandering / climbing routine
    const routineInterval = setInterval(() => {
      const st = catStateRef.current;
      if (st.isJumping) return;

      const dice = Math.random();
      if (dice < 0.4) {
        // Jump / Climb to upper shelf / navbar
        triggerCatJump();
      } else if (dice < 0.7) {
        // Walk to new target
        st.targetX = (Math.random() - 0.5) * 9;
        st.action = 'walk';
        setCurrentActionName('Geziniyor 🐾');
      } else {
        // Sit and look around
        st.action = 'sit';
        setCurrentActionName('Dinleniyor 💖');
        playCatSound('purr');
      }
    }, 4500);

    // 4. Animation Loop using Three.js Clock
    const clock = new THREE.Clock();

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const st = catStateRef.current;

      // Handle Jump / Climb Physics
      if (st.isJumping) {
        st.jumpProgress += delta * 1.8;
        
        // Parabolic arc
        const t = st.jumpProgress;
        if (t <= 1.0) {
          // Horizontal interpolate
          catGroup.position.x = THREE.MathUtils.lerp(st.posX, st.targetX, t);
          // Vertical arc: base lerp + sin jump apex
          const baseLerpY = THREE.MathUtils.lerp(st.posY, st.targetY, t);
          const jumpArc = Math.sin(t * Math.PI) * 2.2;
          catGroup.position.y = baseLerpY + jumpArc;

          // Cute mid-air rotation / flip
          catGroup.rotation.z = Math.sin(t * Math.PI * 2) * 0.4 * st.facing;
          headGroup.rotation.y = Math.sin(t * Math.PI) * 0.3;
          tailGroup.rotation.z = -Math.PI / 4 + Math.sin(t * 8) * 0.5;

          // Tuck legs
          frontLeftLeg.rotation.z = 0.8;
          frontRightLeg.rotation.z = 0.8;
          backLeftLeg.rotation.z = -0.7;
          backRightLeg.rotation.z = -0.7;
        } else {
          // Landing
          st.isJumping = false;
          st.posX = st.targetX;
          st.posY = st.targetY;
          catGroup.position.set(st.posX, st.posY, 0);
          catGroup.rotation.z = 0;
          st.action = Math.random() > 0.5 ? 'sit' : 'walk';
          setCurrentActionName(st.action === 'sit' ? 'Oturdu' : 'Geziniyor');
          playCatSound('meow');
        }
      } 
      // Handle Walking Horizontal Motion
      else if (st.action === 'walk') {
        const dx = st.targetX - catGroup.position.x;
        if (Math.abs(dx) > 0.1) {
          const stepDir = Math.sign(dx);
          st.facing = stepDir;
          catGroup.position.x += stepDir * delta * st.speed;
          st.posX = catGroup.position.x;

          // Walk Leg cycles (opposite phases)
          const walkCycle = elapsed * 10;
          frontLeftLeg.rotation.z = Math.sin(walkCycle) * 0.6;
          frontRightLeg.rotation.z = -Math.sin(walkCycle) * 0.6;
          backLeftLeg.rotation.z = -Math.sin(walkCycle) * 0.6;
          backRightLeg.rotation.z = Math.sin(walkCycle) * 0.6;

          // Body vertical bobbing
          catGroup.position.y = st.posY + Math.abs(Math.sin(walkCycle)) * 0.12;

          // Tail sway
          tailGroup.rotation.y = Math.sin(walkCycle * 0.8) * 0.5;
          tailGroup.rotation.z = -Math.PI / 4 + Math.cos(walkCycle * 0.8) * 0.2;
        } else {
          st.action = 'sit';
        }
      } 
      // Handle Sitting / Idle Cute Movements
      else if (st.action === 'sit') {
        catGroup.position.y = st.posY;
        frontLeftLeg.rotation.z = 0.1;
        frontRightLeg.rotation.z = 0.1;
        backLeftLeg.rotation.z = -0.3;
        backRightLeg.rotation.z = -0.3;

        // Gentle breathing and ear twitch
        headGroup.rotation.y = Math.sin(elapsed * 2) * 0.2;
        headGroup.position.y = 0.95 + Math.sin(elapsed * 3) * 0.03;
        leftEar.rotation.x = -0.2 + Math.sin(elapsed * 4) * 0.1;
        rightEar.rotation.x = 0.2 + Math.cos(elapsed * 4) * 0.1;

        // Gentle tail swaying
        tailGroup.rotation.y = Math.sin(elapsed * 4) * 0.6;
        tailGroup.rotation.z = -Math.PI / 4 + Math.sin(elapsed * 2) * 0.25;
      }

      // Orientation (face moving direction)
      catGroup.scale.x = (st.facing >= 0 ? 1 : -1) * 0.95;

      // Update 2D Screen position for Speech Bubble
      const catScreenPos = catGroup.position.clone();
      catScreenPos.y += 1.6;
      catScreenPos.project(camera);

      const screenX = ((catScreenPos.x + 1) * width) / 2;
      const screenY = ((-catScreenPos.y + 1) * height) / 2;
      setBubblePos({ x: screenX, y: screenY });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(routineInterval);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Three.js Canvas Container (Pointer events none so buttons/menus remain 100% interactive) */}
      <div ref={mountRef} className="absolute inset-0 pointer-events-none" />

      {/* Floating Interactive Speech Bubble above Cat */}
      {showSpeech && (
        <div
          className="absolute pointer-events-auto transition-all duration-150 ease-out transform -translate-x-1/2 -translate-y-full"
          style={{
            left: `${Math.max(140, Math.min(window.innerWidth - 180, bubblePos.x))}px`,
            top: `${Math.max(70, Math.min(window.innerHeight - 80, bubblePos.y))}px`
          }}
        >
          <div className="relative bg-white text-slate-900 border-3 border-amber-400 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-3xl shadow-2xl flex items-center gap-2 animate-bounce-slow">
            <span className="text-xl">🐱</span>
            <span className="font-bold text-amber-950">{speech}</span>
            <button
              onClick={() => {
                playCatSound('meow');
                setSpeech("Hadi oyna benimle! Sayıları ve şekilleri çok seviyorum! 🔴🔺");
              }}
              className="ml-1 text-[11px] bg-amber-500 hover:bg-amber-600 text-white font-black px-2.5 py-1 rounded-full shadow transition hover:scale-105 active:scale-95"
            >
              Sev 🐾
            </button>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-r-3 border-b-3 border-amber-400 rotate-45" />
          </div>
        </div>
      )}

      {/* Cute Interactive Quick Control Bar for Preschoolers */}
      <div className="absolute top-20 right-6 pointer-events-auto flex flex-wrap items-center gap-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl border-2 border-amber-400/80 shadow-2xl">
        <span className="text-xs font-black text-amber-950 flex items-center gap-1.5 px-2">
          <span>🐾 3D Minnoş Kedi:</span>
          <span className="text-pink-600 font-extrabold">{currentActionName}</span>
        </span>
        <button
          onClick={() => {
            playCatSound('jump');
            const st = catStateRef.current;
            st.targetY = 2.2; // Climb up to top menu!
            st.targetX = (Math.random() - 0.5) * 6;
            st.isJumping = true;
            st.jumpProgress = 0;
            setCurrentActionName('Menüye Tırmandı! 🐾');
            setSpeech("Hoppala! Menünün üzerine tırmandım! 🚀");
            setShowSpeech(true);
          }}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-pink-500 text-white font-black text-xs shadow-md hover:scale-105 active:scale-95 transition"
        >
          Menüye Tırman! 🧗‍♀️
        </button>
        <button
          onClick={() => {
            playCatSound('meow');
            const st = catStateRef.current;
            st.targetY = -2.0; // Jump down to ground
            st.targetX = (Math.random() - 0.5) * 8;
            st.isJumping = true;
            st.jumpProgress = 0;
            setCurrentActionName('Aşağı İndi 🐾');
            setSpeech("Miyav! Yere indim, seninle şekil avına hazırım! 🔴");
            setShowSpeech(true);
          }}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-black text-xs shadow-md hover:scale-105 active:scale-95 transition"
        >
          Aşağı İn 🐾
        </button>
      </div>

    </div>
  );
}
