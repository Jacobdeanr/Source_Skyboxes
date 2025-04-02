@echo off
REM Define directories relative to the current folder
set "highResFolder=assets\images\high-res"
set "thumbFolder=assets\images\thumbnails"

REM Create thumbnails folder if it doesn't exist
if not exist "%thumbFolder%" mkdir "%thumbFolder%"

REM Process each JPEG file in the high-res folder
for %%F in ("%highResFolder%\*.jpg") do (
    echo Processing %%~nxF...
    REM Resize and output as JPEG
    magick "%%F" -resize 400x225 "%thumbFolder%\%%~nF.jpg"
    REM Resize and output as WebP
    magick "%%F" -resize 400x225 "%thumbFolder%\%%~nF.webp"
)

REM Mogrify both JPEG and WebP files in the thumbnail folder
for %%e in (jpg webp) do (
    magick mogrify -quality 85 "%thumbFolder%\*.%%e"
)

REM Build Site
ruby generate_skybox_pages.rb
bundle exec jekyll serve --force_polling
