import Image from "next/image";
import { ServiceItems } from "prisma/data";
import React from "react";

function Services() {
  return (
    <section className="w-full  bg-slate-50 p-10 text-black dark:bg-gray-900 dark:text-white">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
            <span className=" mb-2 block text-lg font-semibold">
              Our Services
            </span>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]">
              What We Offer
            </h2>
            <p className="text-body-color text-base">
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {ServiceItems.map((item, index) => (
          <div className="w-full px-4 md:w-1/2 lg:w-1/3" key={index}>
            <div className="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg dark:bg-gray-700 md:px-7 xl:px-10">
              <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-blue-500">
                <Image
                  width={60}
                  height={60}
                  src={item.image}
                  alt={item.title}
                />
              </div>
              <h4 className="mb-3 text-xl font-semibold">{item.title}</h4>
              <p className="text-body-color">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
