#### NEW SCRIPT
myResourceGroup=myResourceGroup
az group create --name $myResourceGroup --location southcentralus

# make sure its linux
az appservice plan create --name myAppServicePlan --resource-group $myResourceGroup --sku B1 --is-linux

# get most recent node
# insert name of web app
webapp=mowebapp234

az webapp create --name $webapp --resource-group $myResourceGroup --plan myAppServicePlan --runtime "NODE|10.14"

# use this on or continuous deployment
az webapp deployment source config --name $webapp \
--resource-group $myResourceGroup --branch master --manual-integration \
--repo-url https://github.com/revaturep2-ama/WebApp1.git