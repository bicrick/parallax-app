#!/usr/bin/env python3
"""
Icon generation script for the parallax app.
This script generates various sizes of icons from the cropped logo.
"""

from PIL import Image, ImageOps
import os
import sys

def resize_with_aspect_ratio(image, target_size, background_color=(255, 255, 255, 0)):
    """
    Resize image while maintaining aspect ratio and center it on a square canvas.
    
    Args:
        image: PIL Image object
        target_size: Target size (width, height) tuple
        background_color: Background color for padding (transparent by default)
    """
    target_width, target_height = target_size
    
    # Calculate the scaling factor to fit within the target size
    scale_factor = min(target_width / image.width, target_height / image.height)
    
    # Calculate new dimensions
    new_width = int(image.width * scale_factor)
    new_height = int(image.height * scale_factor)
    
    # Resize the image
    resized = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Create a new image with the target size and transparent background
    final_image = Image.new('RGBA', target_size, background_color)
    
    # Calculate position to center the resized image
    x = (target_width - new_width) // 2
    y = (target_height - new_height) // 2
    
    # Paste the resized image onto the final image
    final_image.paste(resized, (x, y), resized if resized.mode == 'RGBA' else None)
    
    return final_image

def generate_icon(input_path, output_path, size):
    """
    Generate an icon of the specified size from the input image.
    
    Args:
        input_path: Path to the input logo image
        output_path: Path where the icon will be saved
        size: Size tuple (width, height) for the output icon
    """
    try:
        with Image.open(input_path) as img:
            print(f"Generating {size[0]}x{size[1]} icon...")
            
            # Convert to RGBA to preserve transparency
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            
            # Resize with aspect ratio preservation
            icon = resize_with_aspect_ratio(img, size)
            
            # Save the icon
            icon.save(output_path, format='PNG', optimize=True)
            print(f"Icon saved: {output_path}")
            
            return True
            
    except Exception as e:
        print(f"Error generating {size[0]}x{size[1]} icon: {e}")
        return False

def main():
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    public_dir = os.path.join(script_dir, 'public')
    
    # Input path (cropped logo)
    input_path = os.path.join(public_dir, 'parallax-logo-cropped.png')
    
    # Check if input file exists
    if not os.path.exists(input_path):
        print(f"Error: Cropped logo not found: {input_path}")
        print("Please run crop_logo.py first to create the cropped logo.")
        sys.exit(1)
    
    # Icon sizes to generate
    icon_sizes = [
        (192, 192, 'logo192.png'),
        (512, 512, 'logo512.png'),
        (180, 180, 'apple-touch-icon.png'),  # Apple touch icon
        (32, 32, 'favicon-32x32.png'),       # Favicon 32x32
        (16, 16, 'favicon-16x16.png'),       # Favicon 16x16
    ]
    
    print(f"Generating icons from: {input_path}")
    print(f"Will generate {len(icon_sizes)} different icon sizes...")
    
    success_count = 0
    
    for width, height, filename in icon_sizes:
        output_path = os.path.join(public_dir, filename)
        if generate_icon(input_path, output_path, (width, height)):
            success_count += 1
    
    print(f"\nIcon generation completed!")
    print(f"Successfully generated {success_count} out of {len(icon_sizes)} icons.")
    
    if success_count == len(icon_sizes):
        print("All icons generated successfully!")
    else:
        print("Some icons failed to generate. Check the error messages above.")
        sys.exit(1)

if __name__ == "__main__":
    main()