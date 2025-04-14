import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/database/mongodb";
import Image from "@/models/imageModel";

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const tags = formData.get("tags") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "gallery",
            resource_type: "auto",
            fetch_format: "auto",
            transformation: [
              { width: 800, height: 800, crop: "limit" },
              { quality: "auto" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result as CloudinaryResponse);
          }
        )
        .end(bytes);
    });

    console.log(result);

    await connectToDB();

    const newImage = new Image({
      url: result.secure_url,
      publicId: result.public_id,
      title: title || "",
      tags: tags ? tags.split(",") : [],
    });

    await newImage.save();

    return NextResponse.json({
      message: "success",
      image: newImage,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();
    const images = await Image.find().sort({ createdAt: -1 });
    return NextResponse.json({
      message: "success",
      images,
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json(
        { error: "No public ID provided" },
        { status: 400 }
      );
    }

    await connectToDB();

    const image = await Image.findOneAndDelete({ publicId });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({
      message: "success",
      image,
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
