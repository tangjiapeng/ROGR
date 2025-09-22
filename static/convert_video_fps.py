import os
import imageio.v3 as iio
import numpy as np

# Input and output directory
fps = 20
input_folder = "./tensoir_results"  # Change this to your folder path
output_folder = "./tensoir_results_fps15"  # Change if needed, else use input folder

# input_folder = './ablation_study'
# output_folder = './ablation_study_fps15'

# fps=20
# input_folder = './diffusion_samples'
# output_folder = './diffusion_samples_fps1'

# Ensure output folder exists
os.makedirs(output_folder, exist_ok=True)

# Get all video files in the folder (modify extensions if needed)
video_extensions = (".mp4", ".avi", ".mov", ".mkv")
video_files = [f for f in os.listdir(input_folder) if f.lower().endswith(video_extensions)]
video_files = [f for f in video_files if 'pbir' in f]

#['armadillo-fireplace', 'armadillo-forest', 'armadillo-city',  'armadillo-bridge']

for video_file in video_files[:100]:
    if 'armadillo-fireplace' in output_folder or 'armadillo-forest' in output_folder or 'armadillo-city' in output_folder or  'armadillo-bridge' in output_folder:
        num_frames = 98
    elif 'armadillo-fireplace' in output_folder:
        num_frames = 96
    else:
        num_frames = 100

    if 'diffusion_samples' in input_folder:
        num_frames = 50
        fps =1 
    input_path = os.path.join(input_folder, video_file)
    output_path = os.path.join(output_folder, video_file)

    # Read video frames and metadata
    frames = iio.imread(input_path, index=None)
    #assert len(frames) == 200,
    if len(frames) != 100 and  len(frames) != 200:
        print(f"Expected 100 frames, but got {len(frames)}, {input_path}")
        
    frames = frames[:num_frames]

    # Write video with 30 FPS
    iio.imwrite(output_path, np.array(frames), fps=fps, plugin="pyav", codec="libx264")

    print(f"Saved: {output_path}")

print("All videos have been processed and converted to 30 FPS.")