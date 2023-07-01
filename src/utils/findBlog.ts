import { BlogDetails } from "prisma/data";

export default function findBlog(id: string | string[] | undefined) {
  return BlogDetails.find((blog) => blog.id === Number(id));
}
