import React from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Frontend Developer",
    company: "TechNova",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=85",
    rating: 5,
    review:
      "CareerSphere helped me discover the right opportunity at the right time. The platform is simple, professional and genuinely useful for job seekers.",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "UI/UX Designer",
    company: "CreativeLabs",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=85",
    rating: 5,
    review:
      "I loved how easy it was to explore different opportunities and connect with companies. CareerSphere made my job search much more focused.",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Software Engineer",
    company: "CloudWorks",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=85",
    rating: 5,
    review:
      "The professional experience and quality of opportunities are impressive. I was able to find a role that matched both my skills and career goals.",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    role: "Product Manager",
    company: "InnovateHub",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&auto=format&fit=crop&q=85",
    rating: 5,
    review:
      "CareerSphere gives job seekers everything they need in one place. The interface is clean and finding relevant opportunities feels effortless.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Backend Developer",
    company: "DataCore",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=85",
    rating: 5,
    review:
      "From discovering jobs to building my professional profile, the entire experience has been smooth. It is now one of my favorite career platforms.",
  },
  {
    id: 6,
    name: "Ananya Gupta",
    role: "Marketing Specialist",
    company: "GrowthLabs",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&auto=format&fit=crop&q=85",
    rating: 5,
    review:
      "I found opportunities that actually matched my interests and experience. CareerSphere helped me take a confident step toward my next role.",
  },
];

const Testimonials = () => {
  return (
    <section className="overflow-hidden bg-slate-50 py-6 sm:py-6 lg:py-6">

      {/* =====================================================
          CONTAINER
      ===================================================== */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold text-blue-600 shadow-sm sm:text-sm">
            <Sparkles size={15} />
            Success Stories
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            What Our
            <span className="text-blue-600"> Community Says</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            Thousands of professionals are using CareerSphere to discover
            opportunities, build connections and take the next step in their
            careers.
          </p>

        </div>


        {/* =================================================
            SWIPER
        ================================================= */}
        <div className="relative mt-6 sm:mt-6">

          <Swiper
            modules={[
              Autoplay,
              Pagination,
              Navigation,
              A11y,
            ]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="testimonials-swiper !pb-4"
          >

            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>

                {/* =================================================
                    TESTIMONIAL CARD
                ================================================= */}
                <article
                  className="
                    group
                    relative
                    h-full
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200/80
                    bg-white
                    p-5
                    shadow-[0_4px_20px_rgba(15,23,42,0.04)]
                    transition-all
                    duration-500
                    hover:border-blue-200
                    hover:shadow-[0_15px_35px_rgba(37,99,235,0.10)]
                    sm:p-6
                  "
                >

                  {/* Quote Decoration */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-3
                      -top-3
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-50
                      text-blue-100
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:bg-blue-100
                    "
                  >
                    <Quote
                      size={28}
                      fill="currentColor"
                    />
                  </div>


                  {/* Rating */}
                  <div className="relative flex items-center gap-1">

                    {Array.from({
                      length: testimonial.rating,
                    }).map((_, index) => (
                      <Star
                        key={index}
                        size={14}
                        fill="currentColor"
                        className="text-amber-400"
                      />
                    ))}

                    <span className="ml-1 text-xs font-semibold text-slate-400">
                      5.0
                    </span>

                  </div>


                  {/* Review */}
                  <p className="relative mt-5 text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
                    "{testimonial.review}"
                  </p>


                  {/* User */}
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">

                    {/* Avatar */}
                    <div className="relative shrink-0">

                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        loading="lazy"
                        className="
                          h-11
                          w-11
                          rounded-full
                          object-cover
                          ring-2
                          ring-blue-50
                          transition-all
                          duration-300
                          group-hover:ring-blue-100
                        "
                      />

                      {/* Verified */}
                      <div
                        className="
                          absolute
                          -bottom-0.5
                          -right-0.5
                          flex
                          h-4
                          w-4
                          items-center
                          justify-center
                          rounded-full
                          bg-blue-600
                          text-white
                          ring-2
                          ring-white
                        "
                      >
                        <CheckCircle2 size={10} />
                      </div>

                    </div>


                    {/* User Details */}
                    <div className="min-w-0 flex-1">

                      <h3 className="truncate text-sm font-bold text-slate-900">
                        {testimonial.name}
                      </h3>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {testimonial.role}
                      </p>

                    </div>


                    {/* Company */}
                    <div className="hidden shrink-0 items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500 sm:flex">

                      <BriefcaseBusiness size={11} />

                      {testimonial.company}

                    </div>

                  </div>


                  {/* Bottom Accent */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-[2px]
                      w-0
                      -translate-x-1/2
                      rounded-full
                      bg-gradient-to-r
                      from-blue-500
                      via-indigo-500
                      to-purple-500
                      transition-all
                      duration-500
                      group-hover:w-1/3
                    "
                  />

                </article>

              </SwiperSlide>
            ))}

          </Swiper>

        </div>


        {/* =================================================
            CTA
        ================================================= */}
        <div className="mt-5 flex justify-center">

          <button
            type="button"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-200
              bg-white
              px-5
              py-2.5
              text-xs
              font-bold
              text-blue-600
              shadow-sm
              transition-all
              duration-300
              hover:border-blue-600
              hover:bg-blue-600
              hover:text-white
              hover:shadow-lg
              hover:shadow-blue-500/20
              sm:px-6
              sm:py-3
              sm:text-sm
            "
          >
            Explore CareerSphere

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </div>

      </div>


      {/* =====================================================
          SWIPER CUSTOM CSS
      ===================================================== */}
      <style>
        {`
          .testimonials-swiper .swiper-pagination {
            bottom: 0;
          }

          .testimonials-swiper .swiper-pagination-bullet {
            width: 7px;
            height: 7px;
            opacity: 1;
            background: #cbd5e1;
            transition: all 0.3s ease;
          }

          .testimonials-swiper .swiper-pagination-bullet-active {
            width: 22px;
            border-radius: 999px;
            background: #2563eb;
          }

          .testimonials-swiper .swiper-button-next,
          .testimonials-swiper .swiper-button-prev {
            width: 38px;
            height: 38px;
            border-radius: 999px;
            background: white;
            border: 1px solid #e2e8f0;
            box-shadow: 0 5px 15px rgba(15, 23, 42, 0.08);
          }

          .testimonials-swiper .swiper-button-next:after,
          .testimonials-swiper .swiper-button-prev:after {
            font-size: 14px;
            font-weight: 800;
            color: #2563eb;
          }

          .testimonials-swiper .swiper-button-next:hover,
          .testimonials-swiper .swiper-button-prev:hover {
            background: #2563eb;
          }

          .testimonials-swiper .swiper-button-next:hover:after,
          .testimonials-swiper .swiper-button-prev:hover:after {
            color: white;
          }

          @media (max-width: 767px) {
            .testimonials-swiper .swiper-button-next,
            .testimonials-swiper .swiper-button-prev {
              display: none;
            }
          }
        `}
      </style>

    </section>
  );
};

export default Testimonials;