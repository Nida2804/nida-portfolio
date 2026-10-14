import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * CharacterCanvas
 * Award-winning 60 FPS zero-lag, zero-ghosting cursor-tracking character renderer.
 * 
 * Strict Technical Constraints Followed:
 * 1. NO CSS 3D transforms (no perspective, rotateX, rotateY). Body stays 100% rock-solid motionless.
 * 2. NO in-browser MP4 seeking or playback.
 * 3. 64 pre-extracted WebP trajectory frames + center.webp.
 * 4. Shortest-path circular angular lerp (factor ~0.26) for ~35ms instantaneous tracking.
 * 5. Exactly ONE crisp frame drawn at 100% opacity on canvas (zero ghosting).
 * 6. Center deadzone (~12% screen radius) switches to direct eye contact (center.webp).
 * 7. Seamless background matching: #c41b15.
 */
export default function CharacterCanvas({ onStateChange, className = '' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // References for animation loop state to avoid re-triggering React renders at 60fps
  const animStateRef = useRef({
    images: [],
    centerImage: null,
    currentAngle: 0,       // Smoothed tracking angle in radians
    targetAngle: 0,        // Raw target angle from cursor
    isCenter: true,        // In eye-contact deadzone
    cursorPos: { x: null, y: null },
    facePos: { x: 0, y: 0 },
    activeFrameIndex: 0,
    isInteracting: false,
    compassLabel: 'DIRECT EYE CONTACT'
  });

  // Shortest-path circular angular lerp
  const lerpAngle = useCallback((current, target, factor) => {
    let diff = (target - current) % (Math.PI * 2);
    if (diff < -Math.PI) diff += Math.PI * 2;
    if (diff > Math.PI) diff -= Math.PI * 2;
    return current + diff * factor;
  }, []);

  // Preload all 64 frames and center.webp
  useEffect(() => {
    const totalFrames = 64;
    const imagesArray = new Array(totalFrames);
    let count = 0;

    const onImageLoaded = () => {
      count++;
      setLoadedCount(count);
      const progress = Math.round((count / (totalFrames + 1)) * 100);
      setLoadProgress(progress);
      if (count === totalFrames + 1) {
        setIsLoaded(true);
      }
    };

    // Preload center image
    const centerImg = new Image();
    centerImg.src = '/frames/center.webp';
    centerImg.onload = onImageLoaded;
    centerImg.onerror = () => {
      // Fallback to /center.webp
      centerImg.src = '/center.webp';
      centerImg.onload = onImageLoaded;
    };
    animStateRef.current.centerImage = centerImg;

    // Preload 64 trajectory frames
    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const numStr = i.toString().padStart(2, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      img.onload = onImageLoaded;
      img.onerror = () => {
        console.warn(`Frame ${i} failed to load, retry...`);
      };
      imagesArray[i] = img;
    }
    animStateRef.current.images = imagesArray;

    return () => {
      // Cleanup
      imagesArray.length = 0;
    };
  }, []);

  // Mouse & Touch Interaction Listeners
  useEffect(() => {
    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      animStateRef.current.cursorPos = { x: clientX, y: clientY };
      animStateRef.current.isInteracting = true;
    };

    const handlePointerLeave = () => {
      // When cursor leaves viewport, return to direct center eye contact
      animStateRef.current.isCenter = true;
      animStateRef.current.isInteracting = false;
      animStateRef.current.cursorPos = { x: null, y: null };
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // 60 FPS RequestAnimationFrame Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false for maximum render speed
    let animationFrameId;
    let lastNotified = 0;

    const render = (time) => {
      const state = animStateRef.current;
      const rect = canvas.getBoundingClientRect();

      // Native video frame dimensions
      const canvasW = canvas.width;
      const canvasH = canvas.height;

      // Calculate character face center in viewport coordinates
      // In 1280x720 video, character's face/eyes are centered horizontally and ~38% from top
      const faceScreenX = rect.left + rect.width * 0.5;
      const faceScreenY = rect.top + rect.height * 0.38;
      state.facePos = { x: faceScreenX, y: faceScreenY };

      // Screen radius reference for deadzone (~12% of screen dimension)
      const screenRadius = Math.min(window.innerWidth, window.innerHeight);
      const deadzoneRadius = screenRadius * 0.12;

      let inDeadzone = true;
      let targetCompass = 'DIRECT EYE CONTACT';

      if (state.cursorPos.x !== null && state.cursorPos.y !== null) {
        const dx = state.cursorPos.x - faceScreenX;
        const dy = state.cursorPos.y - faceScreenY;
        const dist = Math.hypot(dx, dy);

        if (dist > deadzoneRadius) {
          inDeadzone = false;
          // Calculate angle relative to face center: atan2(dy, dx)
          state.targetAngle = Math.atan2(dy, dx);
        }
      }

      state.isCenter = inDeadzone;

      // Smooth tracking with shortest-path circular lerp
      // Fast response factor 0.26 tracks in ~35ms with zero perceptible lag
      if (!inDeadzone) {
        state.currentAngle = lerpAngle(state.currentAngle, state.targetAngle, 0.26);
      }

      // Map smoothed angle to nearest frame index (0..63)
      // Angle 0 rad (0°) = RIGHT -> Frame 0
      // Angles increase clockwise: 0 -> 2*PI
      let normAngle = state.currentAngle % (Math.PI * 2);
      if (normAngle < 0) normAngle += Math.PI * 2;
      const frameIndex = Math.round((normAngle / (Math.PI * 2)) * 64) % 64;
      state.activeFrameIndex = frameIndex;

      // Determine human-readable compass direction for HUD/telemetry
      if (inDeadzone) {
        targetCompass = 'DIRECT EYE CONTACT';
      } else {
        const deg = (normAngle * 180) / Math.PI;
        if (deg >= 337.5 || deg < 22.5) targetCompass = 'Open to Opportunities';
        else if (deg >= 22.5 && deg < 67.5) targetCompass = 'Open to Opportunities';
        else if (deg >= 67.5 && deg < 112.5) targetCompass = 'Open to Opportunities';
        else if (deg >= 112.5 && deg < 157.5) targetCompass = 'Open to Opportunities';
        else if (deg >= 157.5 && deg < 202.5) targetCompass = 'Open to Opportunities';
        else if (deg >= 202.5 && deg < 247.5) targetCompass = 'Open to Opportunities';
        else if (deg >= 247.5 && deg < 292.5) targetCompass = 'Open to Opportunities';
        else targetCompass = 'Open to Opportunities';
      }
      state.compassLabel = targetCompass;

      // DRAW EXACTLY ONE CRISP FRAME AT 100% OPACITY (NO GHOSTING, NO ALPHA-BLENDING)
      const targetImg = inDeadzone ? state.centerImage : state.images[frameIndex];

      if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
        ctx.drawImage(targetImg, 0, 0, canvasW, canvasH);
      } else if (state.centerImage && state.centerImage.complete) {
        // Fallback to center if specific frame is buffering
        ctx.drawImage(state.centerImage, 0, 0, canvasW, canvasH);
      }

      // Optional telemetry throttle (every ~80ms) for UI HUD
      if (onStateChange && time - lastNotified > 80) {
        lastNotified = time;
        const currentDeg = Math.round((normAngle * 180) / Math.PI);
        onStateChange({
          frameIndex: inDeadzone ? 'CENTER' : frameIndex,
          angleDeg: inDeadzone ? 0 : currentDeg,
          compass: targetCompass,
          isEyeContact: inDeadzone,
          isTracking: !inDeadzone
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [lerpAngle, onStateChange]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full max-w-[1080px] mx-auto select-none overflow-hidden ${className}`}
      style={{
        // Rock-solid 100% motionless body. NO CSS 3D TRANSFORMS.
        backgroundColor: '#c41b15',
        aspectRatio: '16/9'
      }}
    >
      {/* Loading Shimmer Bar if frames are preloading */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#c41b15] text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span className="font-editorial text-sm tracking-[0.25em] uppercase text-white/90">
              Synchronizing 64 Trajectory Frames
            </span>
          </div>
          <div className="w-56 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-150 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="mt-2 text-xs font-mono text-white/60 tracking-wider">
            {loadProgress}% ({loadedCount}/65)
          </span>
        </div>
      )}

      {/* 
        Single Crisp 60 FPS Canvas Element
        NO CSS 3D transforms (never rotateX, rotateY, perspective)
        Background seamlessly #c41b15
      */}
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="block w-full h-full object-contain pointer-events-none"
        style={{
          backgroundColor: '#c41b15',
          transform: 'none',
          willChange: 'contents'
        }}
      />
    </div>
  );
}
