echo "Switshing to branch master"

git checkout master


echo "Building app..."

npm run build


echo "Deploying files to server"

sudo scp -r build/* root/54.37.12.33:/var/www/54.37.12.33/

echo "Done!"
 