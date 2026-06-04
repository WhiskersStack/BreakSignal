from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
ICON_SIZE = 1024
SPLASH_SIZE = 2732

BG = "#070B14"
BG_SOFT = "#101827"
RING_DARK = "#12314A"
RING_MUTED = "#526176"
CYAN = "#38BDF8"
CYAN_SOFT = "#2E8BC0"
PAUSE = "#E5E7EB"


def draw_mark(size: int, include_disc: bool) -> Image.Image:
    scale = 4
    canvas_size = size * scale
    image = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)

    def box(radius: float) -> tuple[int, int, int, int]:
        center = canvas_size / 2
        r = radius * scale
        return (
            round(center - r),
            round(center - r),
            round(center + r),
            round(center + r),
        )

    def width(value: float) -> int:
        return max(1, round(value * scale))

    if include_disc:
        draw.ellipse(box(size * 0.43), fill=BG_SOFT, outline=RING_DARK, width=width(size * 0.055))

    draw.ellipse(box(size * 0.36), outline=RING_MUTED, width=width(size * 0.025))
    draw.ellipse(box(size * 0.285), outline=CYAN, width=width(size * 0.032))
    draw.arc(box(size * 0.36), start=315, end=405, fill=CYAN, width=width(size * 0.06))
    draw.arc(box(size * 0.36), start=135, end=225, fill=CYAN_SOFT, width=width(size * 0.06))

    bar_width = size * 0.07
    bar_height = size * 0.29
    gap = size * 0.055
    center = canvas_size / 2
    left = center - (gap / 2 + bar_width) * scale
    top = center - (bar_height / 2) * scale
    right = center - (gap / 2) * scale
    bottom = center + (bar_height / 2) * scale
    radius = width(size * 0.035)
    draw.rounded_rectangle((left, top, right, bottom), radius=radius, fill=PAUSE)
    draw.rounded_rectangle(
        (
            center + (gap / 2) * scale,
            top,
            center + (gap / 2 + bar_width) * scale,
            bottom,
        ),
        radius=radius,
        fill=PAUSE,
    )

    return image.resize((size, size), Image.Resampling.LANCZOS)


def create_radial_background(size: int) -> Image.Image:
    image = Image.new("RGB", (size, size), BG)
    pixels = image.load()
    center = (size - 1) / 2
    max_distance = center * 1.15
    inner = (16, 24, 39)
    outer = (7, 11, 20)

    for y in range(size):
        dy = y - center
        for x in range(size):
            distance = ((x - center) ** 2 + dy**2) ** 0.5
            t = min(distance / max_distance, 1.0)
            pixels[x, y] = tuple(round(inner[i] * (1 - t) + outer[i] * t) for i in range(3))

    return image


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)

    source_icon = Image.open(ROOT / "www" / "icons" / "icon-512.png").convert("RGBA")
    source_icon.resize((ICON_SIZE, ICON_SIZE), Image.Resampling.LANCZOS).save(ASSETS / "icon-only.png")

    Image.new("RGB", (ICON_SIZE, ICON_SIZE), BG).save(ASSETS / "icon-background.png")
    draw_mark(ICON_SIZE, include_disc=True).save(ASSETS / "icon-foreground.png")

    splash = create_radial_background(SPLASH_SIZE).convert("RGBA")
    splash_mark = draw_mark(720, include_disc=True)
    splash.alpha_composite(splash_mark, ((SPLASH_SIZE - 720) // 2, (SPLASH_SIZE - 720) // 2))
    splash.convert("RGB").save(ASSETS / "splash.png")
    splash.convert("RGB").save(ASSETS / "splash-dark.png")


if __name__ == "__main__":
    main()
