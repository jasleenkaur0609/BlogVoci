import { ConnectDB } from "@/lib/config/db";
import { writeFile } from "fs/promises";
const { NextResponse } = require("next/server");
import BlogModel from "../../../lib/config/models/BlogModel"; // ✅ CORRECT if lib is outside app
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  console.log("Blog GET Hit");
  return NextResponse.json({ msg: "Api working" });
}

export async function POST(request) {
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;

  await writeFile(path, buffer);

  const imageUrl = `/${timestamp}_${image.name}`;

  const blogData = {
    title: `${formData.get("title")}`,
    description: `${formData.get("description")}`,
    category: `${formData.get("category")}`,
    author: `${formData.get("author")}`,
    image: `${imageUrl}`,
    authorImg: `${formData.get("authorImg")}`,
  };

  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" });
}
