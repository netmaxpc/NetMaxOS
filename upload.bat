@echo off
echo Uploading NetMaxOS to GitHub...
git add .
git commit -m "NetMaxOS update %date% %time%"
git push
echo Upload complete!
pause