import sys

try:
    from PIL import Image
except ImportError:
    print("PIL not installed")
    sys.exit(1)

def get_dominant_colors(image_path, num_colors=5):
    try:
        img = Image.open(image_path)
        img = img.convert('RGB')
        img = img.resize((150, 150))
        result = img.getcolors(150 * 150)
        if result:
            # Sort by count (descending)
            sorted_colors = sorted(result, key=lambda x: x[0], reverse=True)
            # Get top colors
            return [c[1] for c in sorted_colors[:num_colors]]
        return []
    except Exception as e:
        print(f"Error: {e}")
        return []

colors = get_dominant_colors('images/logo.jpg')
if colors:
    print("Dominant Colors (RGB):")
    for c in colors:
        print(f"rgb{c}")
else:
    print("No colors found or error.")
