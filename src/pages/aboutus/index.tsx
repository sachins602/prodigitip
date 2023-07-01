import Link from "next/link";

function Aboutus() {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-white p-4 dark:bg-gray-900 lg:flex-row">
      <div className="w-full px-3 md:w-6/12 md:px-4 lg:w-4/12">
        <div className=" relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg bg-pink-500 shadow-lg">
          <img
            alt="..."
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
            className="w-full rounded-t-lg align-middle"
          />
          <blockquote className="relative mb-4 p-8">
            <h4 className="text-xl font-bold text-white">
              AI-based digital Marketing Agency:
            </h4>
            <p className="text-md mt-2 font-light text-white">
              Our team is always ready and specialized to provide you with the
              services of SEO, Social Media Marketing, Pay Per Click Services,
              Website Designing, and Web Development. With our most effective
              digital marketing strategies and best practice techniques, we
              enable your brand and business to reach the optimum.
            </p>
          </blockquote>
          <Link className="mx-auto" href="mailto:support@prodigitips.com">
            <button
              type="button"
              className="m-2 w-fit rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              CONTACT CUSTOMER SERVICE
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-4">
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Social Media Markeing : Digital Presence
          </h2>
          <ul className="max-w-md list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
            <li>Socail Media Platform Management</li>
            <li>Display your sponsored Adsr</li>
            <li>Content Strategy</li>
          </ul>
          <div />
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Digital Markeing: Customized Plan
          </h2>
          <ul className="max-w-md list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
            <li>SWOT Analysis</li>
            <li>Market Analysis</li>
            <li>Socail Media + Website</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
