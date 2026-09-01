import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
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

import { getTestimonials } from "../redux/slicer/userTestimonialSlice";

const Testimonials = () => {
  const dispatch = useDispatch();

  const {
    testimonials = [],
    loading,
    error,
  } = useSelector((state) => state.usertestimonial);

  useEffect(() => {
    dispatch(getTestimonials());
  }, [dispatch]);

  // =====================================================
  // RATING STARS
  // =====================================================

  const renderStars = (rating) => {
    const safeRating = Math.min(
      5,
      Math.max(1, Number(rating) || 5)
    );

    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={14}
        fill={index < safeRating ? "currentColor" : "none"}
        className={
          index < safeRating
            ? "text-amber-400"
            : "text-slate-200"
        }
      />
    ));
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="overflow-hidden bg-slate-50 py-10 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-r-transparent" />

              <p className="mt-4 text-sm font-medium text-slate-600">
                Loading testimonials...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <section className="overflow-hidden bg-slate-50 py-10 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-600">
              Error loading testimonials: {error}
            </p>

            <button
              type="button"
              onClick={() => dispatch(getTestimonials())}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // EMPTY
  // =====================================================

  if (!testimonials.length) {
    return (
      <section className="overflow-hidden bg-slate-50 py-10 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-sm font-medium text-slate-500">
              No testimonials available yet.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <section className="overflow-hidden bg-slate-50 py-8 sm:py-10 lg:py-12">
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
            What Our{" "}
            <span className="text-blue-600">
              Community Says
            </span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            Hear from professionals around the world who are using
            CareerSphere to discover better opportunities and take
            the next step in their careers.
          </p>
        </div>

        {/* =================================================
            SWIPER
        ================================================= */}

        <div className="relative mt-8 sm:mt-10">

          <Swiper
            modules={[
              Autoplay,
              Pagination,
              Navigation,
              A11y,
            ]}
            spaceBetween={20}
            slidesPerView={1}
            loop={testimonials.length > 3}
            speed={800}
            grabCursor={true}
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
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },

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
            className="testimonials-swiper !pb-12"
          >

            {testimonials.map((testimonial) => {

              const rating =
                Number(testimonial.rating) || 5;

              const image =
                testimonial.image?.thumb ||
                testimonial.image?.url ||
                testimonial.image?.displayUrl;

              return (
                <SwiperSlide
                  key={testimonial._id}
                  className="!h-auto"
                >

                  {/* =================================================
                      CARD
                  ================================================= */}

                  <article
                    className="
                      group
                      relative
                      flex
                      h-full
                      min-h-[280px]
                      flex-col
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200/80
                      bg-white
                      p-5
                      shadow-[0_4px_20px_rgba(15,23,42,0.04)]
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:border-blue-200
                      hover:shadow-[0_15px_35px_rgba(37,99,235,0.10)]
                      sm:p-6
                    "
                  >

                    {/* =================================================
                        QUOTE DECORATION
                    ================================================= */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-4
                        -top-4
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

                    {/* =================================================
                        RATING
                    ================================================= */}

                    <div className="relative flex items-center gap-1">
                      {renderStars(rating)}

                      <span className="ml-1 text-xs font-semibold text-slate-400">
                        {rating.toFixed(1)}
                      </span>
                    </div>

                    {/* =================================================
                        REVIEW
                    ================================================= */}

                    <p
                      className="
                        relative
                        mt-5
                        flex-1
                        text-sm
                        leading-6
                        text-slate-600
                        sm:text-[15px]
                        sm:leading-7
                      "
                    >
                      "{testimonial.review}"
                    </p>

                    {/* =================================================
                        USER
                    ================================================= */}

                    <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">

                      {/* IMAGE */}

                      <div className="relative shrink-0">

                        {image ? (
                          <img
                            src={image}
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
                            onError={(e) => {
                              e.currentTarget.style.display =
                                "none";

                              if (
                                e.currentTarget
                                  .nextElementSibling
                              ) {
                                e.currentTarget.nextElementSibling.style.display =
                                  "flex";
                              }
                            }}
                          />
                        ) : null}

                        {/* FALLBACK */}

                        <div
                          className={`${
                            image ? "hidden" : "flex"
                          } h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white ring-2 ring-blue-50`}
                        >
                          {testimonial.name
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                        {/* VERIFIED */}

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

                      {/* USER DETAILS */}

                      <div className="min-w-0 flex-1">

                        <h3 className="truncate text-sm font-bold text-slate-900">
                          {testimonial.name}
                        </h3>

                        <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
                          {testimonial.country}-Workin in
                        </p>

                      </div>

                      {/* COUNTRY */}

                      <div className="hidden shrink-0 rounded-full bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-500 sm:block">
                        {testimonial.country}
                      </div>
                    </div>

                    {/* =================================================
                        BOTTOM ACCENT
                    ================================================= */}

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
              );
            })}

          </Swiper>
        </div>

        {/* =================================================
            CTA
        ================================================= */}

        <div className="mt-3 flex justify-center">

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
          .testimonials-swiper {
            padding-left: 2px;
            padding-right: 2px;
          }

          .testimonials-swiper .swiper-wrapper {
            align-items: stretch;
          }

          .testimonials-swiper .swiper-slide {
            height: auto;
          }

          /* Pagination */

          .testimonials-swiper .swiper-pagination {
            bottom: 0 !important;
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

          /* Navigation */

          .testimonials-swiper .swiper-button-next,
          .testimonials-swiper .swiper-button-prev {
            width: 40px;
            height: 40px;
            margin-top: -25px;
            border-radius: 999px;
            background: white;
            border: 1px solid #e2e8f0;
            box-shadow: 0 5px 15px rgba(15, 23, 42, 0.08);
            transition: all 0.3s ease;
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
            border-color: #2563eb;
          }

          .testimonials-swiper .swiper-button-next:hover:after,
          .testimonials-swiper .swiper-button-prev:hover:after {
            color: white;
          }

          /* Mobile */

          @media (max-width: 767px) {
            .testimonials-swiper .swiper-button-next,
            .testimonials-swiper .swiper-button-prev {
              display: none;
            }
          }

          /* Small screens */

          @media (max-width: 639px) {
            .testimonials-swiper {
              margin-left: -2px;
              margin-right: -2px;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;