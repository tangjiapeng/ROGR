import os
import imageio.v3 as iio
import numpy as np

# Input and output directory
input_folder = "./input_videos"  # Change this to your folder path
output_folder = "./output_videos"  # Change if needed, else use input folder

# Ensure output folder exists
os.makedirs(output_folder, exist_ok=True)

# Get all video files in the folder (modify extensions if needed)
video_extensions = (".mp4", ".avi", ".mov", ".mkv")
video_files = [f for f in os.listdir(input_folder) if f.lower().endswith(video_extensions)]

for video_file in video_files:
    input_path = os.path.join(input_folder, video_file)
    output_path = os.path.join(output_folder, video_file)

    # Read video frames and metadata
    frames = iio.imread(input_path, index=None)
    assert len(frames) > 0, f"No frames found in {input_path}"

    # Write video with 30 FPS
    iio.imwrite(output_path, np.array(frames), fps=30, plugin="pyav")

    print(f"Saved: {output_path}")

print("All videos have been processed and converted to 30 FPS.")