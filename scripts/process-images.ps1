# Process-images.ps1
# Usage: from project root PowerShell: .\scripts\process-images.ps1
# This script will:
# - Look for image files in ./images (jpg/jpeg/png)
# - Rename them to gallery-1.jpg ... in the order returned by Get-ChildItem
# - Resize each to max width 1200px and compress (requires ImageMagick `magick`)
# - Produce optional WebP versions (gallery-1.webp ...)

param(
    [int]$MaxWidth = 1200,
    [int]$Quality = 85,
    [switch]$GenerateWebP = $true
)

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
# Input directory (where you drop original photos)
$srcDir = Join-Path $projectRoot '..\images' | Resolve-Path -ErrorAction Stop
$srcDir = $srcDir.ProviderPath

# Output directory (public assets)
$outDir = Join-Path $projectRoot '..\public\assets' | Resolve-Path -ErrorAction SilentlyContinue
if (-not $outDir) {
    New-Item -ItemType Directory -Path (Join-Path $projectRoot '..\public\assets') | Out-Null
    $outDir = Join-Path $projectRoot '..\public\assets' | Resolve-Path
}
$outDir = $outDir.ProviderPath

Write-Host "(debug) script location: $projectRoot"

# Supported extensions
$exts = '*.jpg','*.jpeg','*.png','*.JPG','*.JPEG','*.PNG'
Write-Host "Source directory: $srcDir"
Write-Host "Output directory: $outDir"

$allowedExts = @('.jpg','.jpeg','.png','.JPG','.JPEG','.PNG')
$files = Get-ChildItem -Path $srcDir -File | Where-Object { $allowedExts -contains $_.Extension } | Sort-Object LastWriteTime

if ($files.Count -eq 0) {
    Write-Host "No image files found in $srcDir. Please put your photos there and re-run." -ForegroundColor Yellow
    exit 1
}

Write-Host "Found $($files.Count) images. Processing..."

foreach ($file in $files) {
    $targetJpg = Join-Path $outDir $file.Name

    # Copy original to the target name in public/assets (preserve original filename)
    Copy-Item -Path $file.FullName -Destination $targetJpg -Force

    # Resize & compress using ImageMagick
    $magickCmd = "magick convert `"$targetJpg`" -strip -resize ${MaxWidth}x -quality $Quality `"$targetJpg`""
    Write-Host "Optimizing: $targetJpg"
    try {
        iex $magickCmd
    } catch {
        Write-Host "Warning: ImageMagick 'magick' not found or failed. Skipping optimization for $targetJpg" -ForegroundColor Yellow
    }

    if ($GenerateWebP) {
        $base = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
        $targetWebP = Join-Path $outDir ("$base.webp")
        $webpCmd = "magick convert `"$targetJpg`" -quality 80 `"$targetWebP`""
        try {
            iex $webpCmd
        } catch {
            Write-Host "Warning: failed to create WebP for $targetJpg" -ForegroundColor Yellow
        }
    }
}

Write-Host "Done. Processed $($files.Count) images and saved to $outDir"
Write-Host "Files preserved with original names. If you want a different order, rename the source files or adjust sorting in the script."