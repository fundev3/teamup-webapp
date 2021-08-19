import { BlobServiceClient } from "@azure/storage-blob";
import path from "path";
import { v1 as uuidv1 } from "uuid";

const sasToken = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN;
const containerName = "images/webapp";
const baseUrl = process.env.REACT_APP_STORAGE_URL;

async function createBlobInContainer(containerClient, file) {
  const fileName = uuidv1() + path.extname(file.name);
  const blobClient = containerClient.getBlockBlobClient(fileName);
  const options = { blobHTTPHeaders: { blobContentType: file.type } };
  await blobClient.uploadBrowserData(file, options);
  return fileName;
}

export default async function uploadFileToBlob(file) {
  const blobService = new BlobServiceClient(`${baseUrl}/?${sasToken}`);
  const containerClient = blobService.getContainerClient(containerName);
  return await createBlobInContainer(containerClient, file);
}
