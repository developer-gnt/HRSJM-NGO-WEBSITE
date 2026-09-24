Add-Type -AssemblyName System.Drawing
$labels = @("Home", "About HRSJM", "Know Your Rights", "What HRSJM Does", "Membership", "Donation", "Complaint / Get Help", "Events & Activities", "News / Blog", "Contact")
$bmp = New-Object System.Drawing.Bitmap(10, 10)
$g = [System.Drawing.Graphics]::FromImage($bmp)

foreach ($size in @(11, 11.5, 12, 12.5)) {
  $font = New-Object System.Drawing.Font("Segoe UI", $size, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
  $total = 0
  $parts = @()
  foreach ($l in $labels) {
    $w = $g.MeasureString($l, $font).Width
    $total += $w
    $parts += ("{0}={1:f0}" -f $l, $w)
  }
  Write-Host ("font {0}px: text total={1:f0}px  |  {2}" -f $size, $total, ($parts -join " "))
  $font.Dispose()
}
$g.Dispose()
$bmp.Dispose()

Write-Host ""
Write-Host "Available nav width by viewport (container - padding - logo 226 - actions 178 - gaps 40):"
foreach ($vp in @(1440, 1366, 1280, 1200, 1152, 1024)) {
  $pad = [math]::Min(48, [math]::Max(24, $vp * 0.031))
  $avail = $vp - 2 * $pad - 226 - 178 - 40
  Write-Host ("  {0}px viewport -> nav space ~{1:f0}px" -f $vp, $avail)
}