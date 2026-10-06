# Web Dev preview uploads

Upload full-page website screenshots as image assets to the existing Warsal Cloudinary cloud (`hcn0f9nu`).
Set the **public ID** exactly as listed below, without a file extension or folder prefix.
Use tall screenshots (recommended width: 1440px or more) so the hover preview can scroll.
The grid reads these IDs automatically. After replacing existing images under the same IDs, increment WEB_DEV_IMAGE_REVISION in libs/projectVariable.tsx, then rebuild/redeploy the live site. This changes the Cloudinary version path for both src and every srcSet size. Refresh the page to retry a placeholder. Keep the revision stable between uploads; do not use a per-render timestamp.

| Public ID | Website |
| --- | --- |
| `wwb-1` | https://morgan-tattoo-studio.vercel.app/ |
| `wwb-2` | https://all-links-kappa.vercel.app/ |
| `wwb-3` | https://mojju-three.vercel.app/ |
| `wwb-4` | https://custom-craftsmanship-construction-a.vercel.app |
| `wwb-5` | https://estate-indol-iota.vercel.app/ |
| `wwb-6` | https://top-teir-revolutions.vercel.app/ |
| `wwb-7` | https://www.indiraorganics.com.au/ |
| `wwb-8` | https://www.florencemytum.com/ |
| `wwb-9` | https://moutique.co.nz/ |
| `wwb-10` | https://www.awaroalodge.co.nz/ |
| `wwb-11` | https://www.ambassadoronruthven.com.au/ |
| `wwb-12` | https://www.cristetarillera.com/ |
| `wwb-13` | https://www.mikronmfg.com/ |

Open the portfolio at `#webdev`. Existing `#uiuxdesign` and `#uiux` links also select Web Dev.
