import { BlogDetails } from "@/consts/data";

function RelatedArticles({ id }: { id: number }) {
  return (
    <aside
      aria-label="Related articles"
      className="bg-gray-50 py-8 text-black dark:bg-gray-800 dark:text-white lg:py-2"
    >
      <div className="mx-auto max-w-screen-xl px-4">
        <h2 className="mb-8 text-2xl font-bold">Related articles</h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {BlogDetails.slice(0, 4).map((item, i) => (
            <article
              className="max-w-xs"
              key={`${item.author}${i}${item.title}`}
            >
              <a href="#">
                <img
                  src={item.image1}
                  className="mb-5 rounded-lg"
                  alt="Image 1"
                />
              </a>
              <h2 className="mb-2 text-xl font-bold leading-tight">
                <a href="#">{item.title}</a>
              </h2>
              <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
                {item.paragraph1}
              </p>
              <a
                href="#"
                className="text-primary-600 dark:text-primary-500 inline-flex items-center font-medium underline underline-offset-4 hover:no-underline"
              >
                Read in 2 minutes
              </a>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default RelatedArticles;
