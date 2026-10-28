# Run from PowerShell. Update $zip if you saved the ZIP elsewhere.
$project = "D:\studio12\saiteja-cinematic-portfolio"
$zip = "$HOME\Downloads\saiteja-portfolio-premium-v2.zip"
$backup = "D:\studio12\saiteja-cinematic-portfolio-backup-v2"
$temp = "D:\studio12\saiteja-portfolio-v2-extracted"

if (!(Test-Path $zip)) { throw "ZIP not found: $zip. Update `$zip to the actual download path." }
if (!(Test-Path $project)) { throw "Project folder not found: $project. Update `$project to your actual folder." }
if (Test-Path $backup) { throw "Backup already exists: $backup. Rename it or choose another backup path before continuing." }
Copy-Item $project $backup -Recurse
if (Test-Path $temp) { Remove-Item $temp -Recurse -Force }
Expand-Archive -Path $zip -DestinationPath $temp -Force
$source = Join-Path $temp "saiteja-portfolio"
if (!(Test-Path (Join-Path $source "index.html"))) { throw "Expected index.html not found at $source" }
Copy-Item (Join-Path $source "*") $project -Recurse -Force

Write-Host "`nVerification:" -ForegroundColor Cyan
Write-Host "index.html: $(Test-Path (Join-Path $project 'index.html'))"
Write-Host "first frame: $(Test-Path (Join-Path $project 'assets\frames\f000.webp'))"
Write-Host "frame count: $((Get-ChildItem (Join-Path $project 'assets\frames') -Filter '*.webp').Count)"
Write-Host "Backup kept at: $backup" -ForegroundColor Green
Write-Host "Now restart Live Server and press Ctrl+F5 in the browser." -ForegroundColor Green
