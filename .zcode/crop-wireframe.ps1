Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile("C:\GNT Codebase\HRSJM-NGO-WEBSITE\public\WHD-Wireframe.png")
$y = 520; $h = 660
$rect = New-Object System.Drawing.Rectangle(0, $y, $src.Width, [Math]::Min($h, $src.Height - $y))
$bmp = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($src, (New-Object System.Drawing.Rectangle(0, 0, $rect.Width, $rect.Height)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()
$bmp.Save("C:\GNT Codebase\HRSJM-NGO-WEBSITE\.zcode\wireframe-coreareas.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose(); $src.Dispose()
Write-Output "cropped y=$y h=$rect.Height"
