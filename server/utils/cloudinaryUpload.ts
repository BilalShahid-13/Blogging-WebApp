import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = (
  buffer: Buffer,
  fileName: string,
  folder: string = "/"
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: fileName,
        folder: `blogging-web-app-2025/${folder}`,
        resource_type: "auto",
      },
      (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed with no result"));
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};
