import React, { useMemo, useState } from "react";
import {
    Images,
    Search,
    BriefcaseBusiness,
    Users,
    Building2,
    GraduationCap,
    ArrowRight,
    X,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from "lucide-react";

const GALLERY_ITEMS = [
    {
        id: 1,
        title: "Modern Workplace",
        category: "Workplace",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&auto=format&fit=crop&q=85",
        size: "large",
    },
    {
        id: 2,
        title: "Career Growth",
        category: "Career",
        image:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1000&auto=format&fit=crop&q=85",
        size: "normal",
    },
    {
        id: 3,
        title: "Professional Team",
        category: "Professionals",
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&auto=format&fit=crop&q=85",
        size: "normal",
    },
    {
        id: 4,
        title: "Team Collaboration",
        category: "Workplace",
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&auto=format&fit=crop&q=85",
        size: "tall",
    },
    {
        id: 5,
        title: "Learning & Development",
        category: "Learning",
        image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=85",
        size: "normal",
    },
    {
        id: 6,
        title: "Business Meeting",
        category: "Career",
        image:
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&auto=format&fit=crop&q=85",
        size: "normal",
    },
    {
        id: 7,
        title: "Professional Success",
        category: "Professionals",
        image:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=85",
        size: "large",
    },
    {
        id: 8,
        title: "Career Planning",
        category: "Career",
        image:
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&auto=format&fit=crop&q=85",
        size: "normal",
    },
    {
        id: 9,
        title: "Learning Together",
        category: "Learning",
        image:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=85",
        size: "normal",
    },
    {
        id: 10,
        title: "Corporate Team",
        category: "Workplace",
        image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=85",
        size: "tall",
    },
    {
        id: 11,
        title: "Professional Networking",
        category: "Professionals",
        image:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&auto=format&fit=crop&q=85",
        size: "normal",
    },
    {
        id: 12,
        title: "Future Leaders",
        category: "Learning",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=85",
        size: "large",
    },
];

const CATEGORIES = [
    { name: "All", icon: Images },
    { name: "Workplace", icon: Building2 },
    { name: "Career", icon: BriefcaseBusiness },
    { name: "Professionals", icon: Users },
    { name: "Learning", icon: GraduationCap },
];

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedImage, setSelectedImage] = useState(null);

    const filteredItems = useMemo(() => {
        if (activeCategory === "All") {
            return GALLERY_ITEMS;
        }

        return GALLERY_ITEMS.filter(
            (item) => item.category === activeCategory
        );
    }, [activeCategory]);

    const currentIndex = selectedImage
        ? filteredItems.findIndex(
            (item) => item.id === selectedImage.id
        )
        : -1;

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const showPrevious = (e) => {
        e?.stopPropagation();

        if (!filteredItems.length || currentIndex === -1) {
            return;
        }

        const previousIndex =
            currentIndex === 0
                ? filteredItems.length - 1
                : currentIndex - 1;

        setSelectedImage(filteredItems[previousIndex]);
    };

    const showNext = (e) => {
        e?.stopPropagation();

        if (!filteredItems.length || currentIndex === -1) {
            return;
        }

        const nextIndex =
            currentIndex === filteredItems.length - 1
                ? 0
                : currentIndex + 1;

        setSelectedImage(filteredItems[nextIndex]);
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setSelectedImage(null);
    };

    return (
        <div className=" overflow-x-hidden bg-slate-50">

            {/* =====================================================
          HERO
      ===================================================== */}
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">

                {/* Background Decorations */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-32 -top-32 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl sm:h-72 sm:w-72" />

                    <div className="absolute right-0 top-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl sm:h-72 sm:w-72" />

                    <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">

                    <div className="flex min-h-[230px] items-center justify-center py-8 sm:min-h-[260px] sm:py-10 lg:min-h-[290px] lg:py-12">

                        <div className="mx-auto max-w-4xl text-center">

                            {/* Badge */}
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md sm:mb-4">
                                <Sparkles
                                    size={14}
                                    className="text-blue-200"
                                />

                                <span className="text-[11px] font-medium text-blue-100 sm:text-xs">
                                    CareerSphere Gallery
                                </span>
                            </div>

                            {/* Heading */}
                            <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                                Explore Our

                                <span className="mt-1 block bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                                    Career World
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="mx-auto mt-3 max-w-2xl px-2 text-md leading-relaxed text-gray-300 sm:mt-4 sm:text-sm lg:text-base">
                                Discover inspiring moments, professional journeys,
                                workplace culture and everything that makes
                                CareerSphere a better place to build your future.
                            </p>

                            {/* Search Box */}
                            <div className="mx-auto mt-4 max-w-xl sm:mt-5">
                                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 p-1.5 shadow-xl backdrop-blur-xl">

                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white sm:h-9 sm:w-9">
                                        <Search
                                            size={16}
                                            className="text-blue-600"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1 text-left">
                                        <p className="text-[10px] text-blue-200">
                                            Explore
                                        </p>

                                        <p className="truncate text-xs font-medium text-white sm:text-sm">
                                            Workplace, Career, Learning & More
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
          GALLERY
      ===================================================== */}
            <section className="py-8 sm:py-8 lg:py-10">

                <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">

                    {/* Heading */}
                    <div className="mb-8 flex flex-col gap-5 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">

                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <div className="h-1 w-8 rounded-full bg-blue-600" />

                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 sm:text-sm">
                                    Our Gallery
                                </span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                                Moments That
                                <span className="text-blue-600">
                                    {" "}Inspire
                                </span>
                            </h2>

                            <p className="mt-2 max-w-xl text-sm text-gray-500 sm:text-base">
                                Take a look at the people, teams and experiences
                                that define the CareerSphere community.
                            </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Images
                                size={17}
                                className="text-blue-600"
                            />

                            <span>
                                {filteredItems.length} Photos
                            </span>
                        </div>

                    </div>

                    {/* =================================================
              CATEGORY FILTER
          ================================================= */}
                    <div className="scrollbar-hide mb-8 flex gap-2 overflow-x-auto pb-3 sm:gap-3">

                        {CATEGORIES.map((category) => {
                            const Icon = category.icon;
                            const active =
                                activeCategory === category.name;

                            return (
                                <button
                                    key={category.name}
                                    type="button"
                                    onClick={() =>
                                        handleCategoryChange(category.name)
                                    }
                                    className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all duration-300 sm:px-5 sm:py-3 sm:text-sm ${active
                                            ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                            : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                                        }`}
                                >
                                    <Icon size={15} />
                                    {category.name}
                                </button>
                            );
                        })}

                    </div>

                    {/* =================================================
              GALLERY GRID
          ================================================= */}
                    {filteredItems.length > 0 ? (
                        <div className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">

                            {filteredItems.map((item) => {

                                const sizeClass =
                                    item.size === "large"
                                        ? "sm:col-span-2"
                                        : item.size === "tall"
                                            ? "sm:row-span-2"
                                            : "";

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() =>
                                            setSelectedImage(item)
                                        }
                                        aria-label={`View ${item.title}`}
                                        className={`group relative h-full min-h-[260px] overflow-hidden rounded-2xl bg-gray-200 text-left shadow-sm transition-all duration-500 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 sm:rounded-3xl ${sizeClass}`}
                                    >

                                        {/* Image */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />

                                        {/* Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-95" />

                                        {/* Category */}
                                        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-gray-700 backdrop-blur-md sm:left-4 sm:top-4 sm:text-xs">
                                            {item.category}
                                        </div>

                                        {/* Center Icon */}
                                        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 sm:h-14 sm:w-14">
                                            <Images
                                                size={20}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        {/* Bottom Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                            <div className="flex items-end justify-between gap-3">

                                                <div className="min-w-0">
                                                    <h3 className="truncate text-base font-bold leading-tight text-white sm:text-lg">
                                                        {item.title}
                                                    </h3>

                                                    <p className="mt-1 text-xs text-white/70 sm:text-sm">
                                                        CareerSphere
                                                    </p>
                                                </div>

                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors duration-300 group-hover:bg-blue-600">
                                                    <ArrowRight
                                                        size={16}
                                                        className="-rotate-45 text-white transition-transform duration-300 group-hover:rotate-0"
                                                    />
                                                </div>

                                            </div>
                                        </div>

                                    </button>
                                );
                            })}

                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                            <Images
                                size={40}
                                className="mx-auto text-gray-300"
                            />

                            <h3 className="mt-4 text-lg font-semibold text-gray-800">
                                No photos found
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Try selecting another category.
                            </p>
                        </div>
                    )}

                </div>
            </section>

            {/* =====================================================
          CTA
      ===================================================== */}
            <section className="px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">

                <div className="relative mx-auto max-w-[90rem] overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">

                    {/* Decorations */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

                    <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />

                    <div className="relative mx-auto max-w-3xl text-center">

                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
                            <BriefcaseBusiness size={14} />
                            Build Your Future
                        </div>

                        <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                            Ready to Create Your
                            <span className="text-blue-100">
                                {" "}Success Story?
                            </span>
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm text-blue-100/80 sm:text-base">
                            Join thousands of professionals and discover
                            opportunities that can transform your career.
                        </p>

                        <button
                            type="button"
                            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-600 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:px-8 sm:py-3.5 sm:text-base"
                        >
                            Explore Jobs
                            <ArrowRight size={18} />
                        </button>

                    </div>
                </div>
            </section>

            {/* =====================================================
          LIGHTBOX
      ===================================================== */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-4"
                    onClick={closeLightbox}
                >

                    {/* Close */}
                    <button
                        type="button"
                        onClick={closeLightbox}
                        aria-label="Close image"
                        className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
                    >
                        <X size={20} />
                    </button>

                    {/* Previous */}
                    <button
                        type="button"
                        onClick={showPrevious}
                        aria-label="Previous image"
                        className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:left-5 sm:h-12 sm:w-12 lg:left-8"
                    >
                        <ChevronLeft size={22} />
                    </button>

                    {/* Main Image */}
                    <div
                        className="flex max-h-[90vh] w-full max-w-5xl flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <img
                            src={selectedImage.image}
                            alt={selectedImage.title}
                            className="max-h-[72vh] max-w-full rounded-xl object-contain shadow-2xl sm:max-h-[78vh] sm:rounded-2xl"
                        />

                        <div className="mt-3 text-center sm:mt-4">
                            <h3 className="text-base font-bold text-white sm:text-xl">
                                {selectedImage.title}
                            </h3>

                            <p className="mt-1 text-xs text-white/60 sm:text-sm">
                                {selectedImage.category}
                            </p>
                        </div>

                    </div>

                    {/* Next */}
                    <button
                        type="button"
                        onClick={showNext}
                        aria-label="Next image"
                        className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 sm:right-5 sm:h-12 sm:w-12 lg:right-8"
                    >
                        <ChevronRight size={22} />
                    </button>

                </div>
            )}

        </div>
    );
};

export default Gallery;