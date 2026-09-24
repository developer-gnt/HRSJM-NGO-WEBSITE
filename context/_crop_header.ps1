Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile("$PSScriptRoot\..\image.png")
Write-Host "image.png: $($src.Width)x$($src.Height)"

function CropScale($x, $y, $w, $h, $scale, $out) {
  $crop = New-Object System.Drawing.Bitmap([int]($w*$scale), [int]($h*$scale))
  $g = [System.Drawing.Graphics]::FromImage($crop)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $srcRect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
  $dstRect = New-Object System.Drawing.Rectangle(0, 0, $crop.Width, $crop.Height)
  $g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
  $crop.Save($out)
  $g.Dispose(); $crop.Dispose()
  Write-Host "saved $out"
}

# Header logo lockup area (top-left of image.png)
CropScale 0 0 380 60 4 "$PSScriptRoot\_header_lockup.png"
# Footer logo lockup area (bottom-left)
CropScale 20 1330 260 110 4 "$PSScriptRoot\_footer_lockup.png"
$src.Dispose()