az group create --name myResourceGroup --location southcentralus
blobStorageAccount=moblobstorage4

az storage account create --name $blobStorageAccount \
--location southcentralus --resource-group myResourceGroup \
--sku Standard_LRS --kind blobstorage --access-tier hot  

blobStorageAccountKey=$(az storage account keys list -g myResourceGroup \
-n $blobStorageAccount --query [0].value --output tsv)

az storage container create -n images --account-name $blobStorageAccount \
--account-key $blobStorageAccountKey --public-access off

az storage container create -n thumbnails --account-name $blobStorageAccount \
--account-key $blobStorageAccountKey --public-access container

echo "Make a note of your Blob storage account key..."
echo $blobStorageAccountKey

# make sure its linux
az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku B1 --is-linux

# get most recent node
webapp=mowebapp234

az webapp create --name $webapp --resource-group myResourceGroup --plan myAppServicePlan --runtime "NODE|10.14"

az webapp deployment source config --name $webapp \
--resource-group myResourceGroup --branch master --manual-integration \
--repo-url https://github.com/revaturep2-ama/WebApp1.git

storageConnectionString=$(az storage account show-connection-string --resource-group myResourceGroup \
--name $blobStorageAccount --query connectionString --output tsv)

az webapp config appsettings set --name $webapp --resource-group myResourceGroup \
--settings AzureStorageConfig__ImageContainer=images  \
AzureStorageConfig__ThumbnailContainer=thumbnails \
AzureStorageConfig__AccountName=$blobStorageAccount \
AzureStorageConfig__AccountKey=$blobStorageAccountKey \
AZURE_STORAGE_CONNECTION_STRING=$storageConnectionString