# Video Conversion Project

This project provides a Python script to convert videos into a format with 30 frames per second (FPS). It reads video files from a specified input directory, processes the frames, and saves them to an output directory with the specified FPS.

## Project Structure

```
video-conversion-project
├── src
│   ├── convert_video_fps.py  # Main logic for converting videos
│   └── __init__.py            # Marks the directory as a Python package
├── requirements.txt            # Lists project dependencies
└── README.md                   # Project documentation
```

## Requirements

To run this project, you need to install the following dependencies:

- imageio
- numpy

You can install the required packages using pip:

```
pip install -r requirements.txt
```

## Usage

1. Place your video files in the `./tensoir_results` directory.
2. Run the conversion script:

```
python src/convert_video_fps.py
```

3. The converted videos will be saved in the `./tensoir_results_fps30` directory.

## Notes

- Ensure that the input directory contains video files in supported formats (e.g., .mp4, .avi, .mov, .mkv).
- The script currently expects 200 frames per video. Adjust the script if your videos have a different number of frames.