"""Gera src/assets/barbearia/*.webp + index.ts a partir dos JPGs originais.
Uso: python3 -I scripts/optimize-photos.py <pasta-com-originais>   (requer Pillow)"""
import sys, pathlib
from PIL import Image
src = pathlib.Path(sys.argv[1]); out = pathlib.Path(__file__).resolve().parent.parent / "src/assets/barbearia"
MAP = {  # nome final: (arquivo original, lado maior máx)
 "hero": ("barbearia-alemao-03-proprietario-trabalhando.jpg", 1400),
 "alemao": ("barbearia-alemao-02-proprietario.jpg", 1200),
 "interior": ("barbearia-alemao-01-interior.jpg", 1200),
 "ambiente": ("barbearia-alemao-04-ambiente.jpg", 1200),
 "corte-antes": ("barbearia-alemao-07-corte-antes.jpg", 900),
 "corte-depois": ("barbearia-alemao-08-corte-depois.jpg", 900),
 "barba-antes": ("barbearia-alemao-05-grisalho-antes.jpg", 900),
 "barba-depois": ("barbearia-alemao-06-grisalho-depois.jpg", 900),
 "pompadour-antes": ("barbearia-alemao-09-cacheado-antes.jpg", 900),
 "pompadour-depois": ("barbearia-alemao-10-cacheado-depois.jpg", 900),
 "cacheado-antes": ("barbearia-alemao-11-volume-antes.jpg", 900),
 "cacheado-depois": ("barbearia-alemao-12-volume-depois.jpg", 900),
 "logo": ("logo-barbearia-alemao.png", 320),
}
ts = ["// Gerado por scripts/optimize-photos.py — não editar à mão.\n"]
for name, (f, mx) in MAP.items():
    im = Image.open(src / f).convert("RGB"); im.thumbnail((mx, mx), Image.LANCZOS)
    im.save(out / f"{name}.webp", "WEBP", quality=80, method=6)
    camel = "".join(p.capitalize() if i else p for i, p in enumerate(name.split("-")))
    ts.append(f'import {camel}Url from "./{name}.webp";\n')
    ts.append(f'export const {camel} = {{ src: {camel}Url, width: {im.width}, height: {im.height} }};\n')
(out / "index.ts").write_text("".join(ts))
