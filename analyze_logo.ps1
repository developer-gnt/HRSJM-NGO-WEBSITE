Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("public\logo.png")
$w = $bmp.Width
$h = $bmp.Height

Write-Host "=== Fine map: full width, bottom half (y 200-448) ==="
for ($y = 200; $y -lt $h; $y += 4) {
  $row = ""
  for ($x = 0; $x -lt $w; $x += 3) {
    $c = $bmp.GetPixel($x, $y)
    if ($c.A -lt 16) { $row += " " }
    elseif ($c.R -gt 225 -and $c.G -gt 225 -and $c.B -gt 225) { $row += "." }
    elseif ($c.R -lt 90 -and $c.G -lt 100 -and $c.B -gt 50) { $row += "N" }
    elseif ($c.R -gt 160 -and $c.G -gt 110 -and $c.B -lt 120 -and $c.R -gt $c.B + 60) { $row += "G" }
    else { $row += "o" }
  }
  Write-Host ("y{0,3}: {1}" -f $y, $row)
}
$bmp.Dispose()