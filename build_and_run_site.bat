@echo off
REM Define directories
set "highRes=assets\images\high-res"
set "thumbs=assets\images\thumbnails"
set "thumbquality=85"

REM Create thumbnail dir if needed
if not exist "%thumbs%" mkdir "%thumbs%"

REM Thumbnail JPEGs compression
echo Processing jpg thumbnails
magick mogrify ^
  -path "%thumbs%" ^
  -resize 400x225 ^
  -quality %thumbquality% ^
  -format jpg ^
  "%highRes%\*.jpg"

REM Thumbnail JPEGs → AVIF
echo Processing avif thumbnails
magick mogrify ^
  -path "%thumbs%" ^
  -resize 400x225 ^
  -quality %thumbquality% ^
  -format avif ^
  "%highRes%\*.jpg"

REM Thumbnail JPEGs → WebP
echo Processing webp thumbnails
magick mogrify ^
  -path "%thumbs%" ^
  -resize 400x225 ^
  -quality %thumbquality% ^
  -format webp ^
  "%highRes%\*.jpg"

REM High-res JPEGs → WebP
echo Processing webp full Res
magick mogrify ^
  -format webp ^
  -quality 90 ^
  "%highRes%\*.jpg"

REM High-res JPEGs → AVIF
echo Processing avif full Res
magick mogrify ^
  -format avif ^
  -quality 90 ^
  "%highRes%\*.jpg"

REM Build Site
ruby generate_skybox_pages.rb
bundle exec jekyll serve --force_polling
