import Link from "next/link";
import { api } from "@/utils/api";

function Blogs() {
  const blogs = api.blogs.getAll.useQuery();

  return (
    <div className="w-full space-y-6 bg-white p-4 text-black dark:bg-gray-900 dark:text-white">
      {blogs.data &&
        blogs.data.map((blog, index) => (
          <div
            key={`blog-${index}+${blog.id}+${blog.author}`}
            className=" mx-auto w-[80%] rounded-xl border bg-slate-50 p-4 dark:bg-gray-800"
          >
            <div className="flex w-full items-center justify-between border-b pb-3">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]" />
                <div className="text-lg font-bold">{blog.author}</div>
              </div>
              <div className="flex items-center space-x-8">
                <button className="rounded-2xl border bg-neutral-100 px-3 py-1 text-xs font-semibold text-black">
                  Blog
                </button>
                <div className="text-xs ">{blog.publishedOn}</div>
              </div>
            </div>
            <div className="mb-6 mt-4">
              <Link
                href={`/blogs/blog/${blog.id}`}
                className="mb-3 cursor-pointer text-xl font-bold hover:text-blue-400 hover:underline"
              >
                {blog.title}
              </Link>
              <div className="text-sm ">{blog.paragraph1}</div>
            </div>
            <div>
              <div className="flex items-center justify-between ">
                <div className="flex space-x-4 md:space-x-8">
                  <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1.5 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    {/* <span>{getNumberofComments(blog.id)}</span> */}
                  </div>
                  <div className="flex cursor-pointer items-center transition hover:text-slate-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1.5 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    {/* <span>{getNumberofLikes(blog.id)}</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Blogs;
