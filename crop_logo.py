#!/usr/bin/env python3
"""
Logo cropping script for the parallax app.
This script automatically detects and crops logos to remove excessive whitespace.
"""

from PIL import Image, ImageOps
import os
import sys

def find_logo_bounds(image):
    """
    Find the bounding box of the logo content by detecting non-transparent pixels.
    """
    # Convert to RGBA to handle transparency
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # Get the alpha channel
    alpha = image.split()[-1]
    
    # Find the bounding box of non-transparent pixels
    bbox = alpha.getbbox()
    
    if bbox is None:
        # If no non-transparent pixels found, return the full image bounds
        return (0, 0, image.width, image.height)
    
    return bbox

def crop_logo(input_path, output_path, padding=20):
    """
    Crop the logo to remove excess whitespace while maintaining aspect ratio.
    
    Args:
        input_path: Path to the input logo image
        output_path: Path where the cropped logo will be saved
        padding: Extra padding around the logo content (in pixels)
    """
    try:
        # Open the image
        with Image.open(input_path) as img:
            print(f"Original image size: {img.width}x{img.height}")
            
            # Find the content bounds
            bbox = find_logo_bounds(img)
            left, top, right, bottom = bbox
            
            print(f"Content bounds: {bbox}")
            
            # Add padding
            left = max(0, left - padding)
            top = max(0, top - padding)
            right = min(img.width, right + padding)
            bottom = min(img.height, bottom + padding)
            
            # Crop the image
            cropped = img.crop((left, top, right, bottom))
            
            print(f"Cropped size: {cropped.width}x{cropped.height}")
            
            # Save the cropped image
            cropped.save(output_path, format='PNG', optimize=True)
            print(f"Cropped logo saved to: {output_path}")
            
            return True
            
    except Exception as e:
        print(f"Error cropping logo: {e}")
        return False

def main():
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    public_dir = os.path.join(script_dir, 'public')
    
    # Input and output paths
    input_path = os.path.join(public_dir, 'parallax-text-logo.png')
    output_path = os.path.join(public_dir, 'parallax-text-logo-cropped.png')
    
    # Check if input file exists
    if not os.path.exists(input_path):
        print(f"Error: Input file not found: {input_path}")
        sys.exit(1)
    
    print(f"Cropping logo from: {input_path}")
    print(f"Output will be saved to: {output_path}")
    
    # Crop the logo
    if crop_logo(input_path, output_path):
        print("Logo cropping completed successfully!")
    else:
        print("Logo cropping failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()