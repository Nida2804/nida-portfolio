import os
import json
import cv2
import numpy as np

def extract():
    video_path = os.path.join(os.path.dirname(__file__), 'public', 'character.mp4')
    if not os.path.exists(video_path):
        alt_path = os.path.join(os.path.dirname(__file__), 'public', 'Character.mp4.mp4')
        if os.path.exists(alt_path):
            video_path = alt_path
        else:
            raise FileNotFoundError(f"Video not found at {video_path}")

    print(f"Opening video: {video_path}")
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError("Could not open video file.")

    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    duration = total_frames / fps if fps > 0 else 0

    print(f"Video Info:")
    print(f"  Resolution: {w}x{h}")
    print(f"  FPS: {fps}")
    print(f"  Total Frames: {total_frames}")
    print(f"  Duration: {duration:.2f}s")

    # Detect exact background color from border samples
    border_samples = []
    for test_idx in [0, 30, 60, 90, 120, 150, 180, 210, 235]:
        cap.set(cv2.CAP_PROP_POS_FRAMES, test_idx)
        ret, frame = cap.read()
        if ret:
            # Sample four corners and edge borders
            border_samples.extend([
                frame[5, 5],
                frame[5, w - 6],
                frame[h - 6, 5],
                frame[h - 6, w - 6],
                frame[5, w // 2],
                frame[h // 2, 5],
                frame[h // 2, w - 6]
            ])
    border_samples = np.array(border_samples)
    median_bgr = np.median(border_samples, axis=0).astype(int)
    bg_rgb = [int(median_bgr[2]), int(median_bgr[1]), int(median_bgr[0])]
    bg_hex = f"#{bg_rgb[0]:02x}{bg_rgb[1]:02x}{bg_rgb[2]:02x}"
    print(f"\nBackground Color Detected:")
    print(f"  RGB: {bg_rgb}")
    print(f"  Hex: {bg_hex}")

    # Compass Directions and Anchor Frames
    # Angle 0 rad (0°) = RIGHT (dx > 0, dy = 0)
    # Clockwise in screen coordinates:
    # 0° (0 rad): RIGHT
    # 45° (pi/4): DOWN-RIGHT
    # 90° (pi/2): DOWN
    # 135° (3pi/4): DOWN-LEFT
    # 180° (pi): LEFT
    # 225° (5pi/4): UP-LEFT
    # 270° (3pi/2): UP
    # 315° (7pi/4): UP-RIGHT
    compass_anchors = {
        "RIGHT": {"angle_deg": 0.0, "frame": 100},
        "DOWN-RIGHT": {"angle_deg": 45.0, "frame": 136},
        "DOWN": {"angle_deg": 90.0, "frame": 164},
        "DOWN-LEFT": {"angle_deg": 135.0, "frame": 180},
        "LEFT": {"angle_deg": 180.0, "frame": 200},
        "UP-LEFT": {"angle_deg": 225.0, "frame": 212},
        "UP": {"angle_deg": 270.0, "frame": 24},
        "UP-RIGHT": {"angle_deg": 315.0, "frame": 56},
        "CENTER": {"description": "Neutral direct eye contact", "frame": 235}
    }

    print("\nIdentified Compass Directions & Anchor Frames:")
    for dir_name, info in compass_anchors.items():
        if "angle_deg" in info:
            print(f"  {dir_name:12s} : {info['angle_deg']:5.1f}° -> Frame #{info['frame']}")
        else:
            print(f"  {dir_name:12s} : {info['description']} -> Frame #{info['frame']}")

    # 64 frames along 360° circular trajectory
    def get_source_video_frame(i):
        # i from 0 to 63
        if 0 <= i < 8:
            t = i / 8.0
            return int(round(100 + t * (136 - 100)))
        elif 8 <= i < 16:
            t = (i - 8) / 8.0
            return int(round(136 + t * (164 - 136)))
        elif 16 <= i < 24:
            t = (i - 16) / 8.0
            return int(round(164 + t * (180 - 164)))
        elif 24 <= i < 32:
            t = (i - 24) / 8.0
            return int(round(180 + t * (200 - 180)))
        elif 32 <= i < 40:
            t = (i - 32) / 8.0
            return int(round(200 + t * (212 - 200)))
        elif 40 <= i < 48:
            t = (i - 40) / 8.0
            if t < 0.5:
                return int(round(212 + (t / 0.5) * (218 - 212)))
            else:
                return int(round(18 + ((t - 0.5) / 0.5) * (24 - 18)))
        elif 48 <= i < 56:
            t = (i - 48) / 8.0
            return int(round(24 + t * (56 - 24)))
        elif 56 <= i < 64:
            t = (i - 56) / 8.0
            return int(round(56 + t * (100 - 56)))
        return 100

    out_dir = os.path.join(os.path.dirname(__file__), 'public', 'frames')
    os.makedirs(out_dir, exist_ok=True)

    print(f"\nPre-extracting 64 WebP frames into {out_dir} (Quality 90)...")
    frame_map = {}
    for i in range(64):
        vf = get_source_video_frame(i)
        angle_deg = i * (360.0 / 64.0)
        cap.set(cv2.CAP_PROP_POS_FRAMES, vf)
        ret, frame = cap.read()
        if not ret:
            raise RuntimeError(f"Could not read frame {vf}")
        
        filename = f"frame_{i:02d}.webp"
        filepath = os.path.join(out_dir, filename)
        # Write high quality WebP
        cv2.imwrite(filepath, frame, [cv2.IMWRITE_WEBP_QUALITY, 90])
        frame_map[i] = {
            "index": i,
            "filename": filename,
            "angle_deg": angle_deg,
            "video_frame": vf
        }

    # Extract center neutral frame
    center_vf = compass_anchors["CENTER"]["frame"]
    cap.set(cv2.CAP_PROP_POS_FRAMES, center_vf)
    ret, center_frame = cap.read()
    if not ret:
        raise RuntimeError(f"Could not read center frame {center_vf}")

    center_path = os.path.join(os.path.dirname(__file__), 'public', 'center.webp')
    center_frames_path = os.path.join(out_dir, 'center.webp')
    cv2.imwrite(center_path, center_frame, [cv2.IMWRITE_WEBP_QUALITY, 90])
    cv2.imwrite(center_frames_path, center_frame, [cv2.IMWRITE_WEBP_QUALITY, 90])
    print(f"Saved center neutral frame to {center_path} and {center_frames_path}")

    # Write metadata json
    metadata = {
        "width": w,
        "height": h,
        "total_frames": 64,
        "step_deg": 360.0 / 64.0,
        "background_hex": bg_hex,
        "background_rgb": bg_rgb,
        "compass_anchors": compass_anchors,
        "frames": frame_map
    }
    meta_path = os.path.join(out_dir, 'metadata.json')
    with open(meta_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2)
    print(f"Saved metadata to {meta_path}")

    cap.release()
    print("Frame pre-extraction successfully finished!")

if __name__ == '__main__':
    extract()
