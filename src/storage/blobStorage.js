import { BlobServiceClient } from "@azure/storage-blob";
import { CONTAINER } from "../constants";
import path from "path";
import { v1 as uuidv1 } from "uuid";

const sasToken = process.env.REACT_APP_STORAGE_SAS_TOKEN;
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
  const containerClient = blobService.getContainerClient(CONTAINER);
  return await createBlobInContainer(containerClient, file);
}
