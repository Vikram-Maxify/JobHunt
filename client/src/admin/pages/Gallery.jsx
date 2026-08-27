// src/admin/pages/Gallery.jsx
import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Save,
  Building2,
  Briefcase,
  Users,
  GraduationCap,
  Eye,
  ArrowLeft,
} from "lucide-react";
import StateCard from "../components/StateCard";

// Mock Gallery Data - Replace with API integration
const mockGalleryData = [
  {
    id: "GAL001",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    heading: "Modern Work Environment",
    subHeading: "Creating productive and collaborative spaces",
    category: "Workplace",
    createdAt: "2026-08-20",
  },
  {
    id: "GAL002",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
    heading: "Team Collaboration",
    subHeading: "Working together to achieve great results",
    category: "Workplace",
    createdAt: "2026-08-21",
  },
  {
    id: "GAL003",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
    heading: "Professional Growth",
    subHeading: "Building successful career paths",
    category: "Career",
    createdAt: "2026-08-22",
  },
  {
    id: "GAL004",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    heading: "Business Meeting",
    subHeading: "Strategic planning and execution",
    category: "Career",
    createdAt: "2026-08-23",
  },
  {
    id: "GAL005",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    heading: "Learning Together",
    subHeading: "Continuous education and skill development",
    category: "Learning",
    createdAt: "2026-08-24",
  },
  {
    id: "GAL006",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    heading: "Workshop Session",
    subHeading: "Hands-on training and practical learning",
    category: "Learning",
    createdAt: "2026-08-25",
  },
  {
    id: "GAL007",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop",
    heading: "Professional Woman",
    subHeading: "Empowering women in the workplace",
    category: "Professionals",
    createdAt: "2026-08-26",
  },
  {
    id: "GAL008",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=400&fit=crop",
    heading: "Executive Portrait",
    subHeading: "Leadership and professional excellence",
    category: "Professionals",
    createdAt: "2026-08-27",
  },
];

const Gallery = () => {
  const navigate = useNavigate();

  // State Management
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch gallery items - Replace with actual API call
  const fetchGalleryItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setGalleryItems(mockGalleryData);
    } catch (err) {
      setError("Failed to load gallery images. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleryItems();
  }, [fetchGalleryItems]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const totalImages = galleryItems.length;
    const workplaceImages = galleryItems.filter(
      (item) => item.category === "Workplace",
    ).length;
    const careerImages = galleryItems.filter(
      (item) => item.category === "Career",
    ).length;
    const professionalsImages = galleryItems.filter(
      (item) => item.category === "Professionals",
    ).length;
    const learningImages = galleryItems.filter(
      (item) => item.category === "Learning",
    ).length;

    return {
      totalImages,
      workplaceImages,
      careerImages,
      professionalsImages,
      learningImages,
    };
  }, [galleryItems]);

  // Filter gallery items
  const filteredGalleryItems = useMemo(() => {
    let result = [...galleryItems];

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.heading.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower) ||
          (item.subHeading &&
            item.subHeading.toLowerCase().includes(searchLower)),
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((item) => item.category === categoryFilter);
    }

    // Sort by createdAt (newest first)
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return result;
  }, [galleryItems, searchTerm, categoryFilter]);

  // Handle add gallery item
  const handleAddGalleryItem = async (newItem) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setGalleryItems((prev) => [...prev, newItem]);
      setIsAddModalOpen(false);
      showNotification("Image added successfully", "success");
    } catch (err) {
      showNotification("Failed to add image", "error");
    }
  };

  // Handle edit gallery item
  const handleEditGalleryItem = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  // Handle save edited gallery item
  const handleSaveGalleryItem = async (updatedItem) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setGalleryItems((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      );
      setIsEditModalOpen(false);
      setEditingItem(null);
      showNotification("Image updated successfully", "success");
    } catch (err) {
      showNotification("Failed to update image", "error");
    }
  };

  // Handle delete gallery item
  const handleDeleteGalleryItem = (item) => {
    setDeletingItem(item);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setGalleryItems((prev) =>
        prev.filter((item) => item.id !== deletingItem.id),
      );
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
      showNotification("Image deleted successfully", "success");
    } catch (err) {
      showNotification("Failed to delete image", "error");
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Workplace":
        return <Building2 className="w-4 h-4" />;
      case "Career":
        return <Briefcase className="w-4 h-4" />;
      case "Professionals":
        return <Users className="w-4 h-4" />;
      case "Learning":
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  // Get category badge color
  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case "Workplace":
        return "bg-blue-50 text-blue-700";
      case "Career":
        return "bg-indigo-50 text-indigo-700";
      case "Professionals":
        return "bg-purple-50 text-purple-700";
      case "Learning":
        return "bg-green-50 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  // Loading state
  if (loading) {
    return <GalleryLoadingState />;
  }

  // Error state
  if (error) {
    return <GalleryErrorState error={error} onRetry={fetchGalleryItems} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            Gallery Management
          </p>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Gallery Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and organize your gallery images
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <StateCard
          title="Total Images"
          value={statistics.totalImages}
          icon={<ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
          description="All gallery images"
          iconBg="bg-blue-50"
        />
        <StateCard
          title="Workplace"
          value={statistics.workplaceImages}
          icon={<Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />}
          description="Workplace images"
          iconBg="bg-indigo-50"
        />
        <StateCard
          title="Career"
          value={statistics.careerImages}
          icon={<Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />}
          description="Career images"
          iconBg="bg-purple-50"
        />
        <StateCard
          title="Professionals"
          value={statistics.professionalsImages}
          icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />}
          description="Professional images"
          iconBg="bg-green-50"
        />
        <StateCard
          title="Learning"
          value={statistics.learningImages}
          icon={
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
          }
          description="Learning images"
          iconBg="bg-amber-50"
        />
      </div>

      {/* Gallery Management Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Gallery Images
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Showing {filteredGalleryItems.length} image
                {filteredGalleryItems.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by heading or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-colors"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm text-slate-700"
              >
                <option value="all">All</option>
                <option value="Workplace">Workplace</option>
                <option value="Career">Career</option>
                <option value="Professionals">Professionals</option>
                <option value="Learning">Learning</option>
              </select>

              {(searchTerm || categoryFilter !== "all") && (
                <button
                  onClick={clearFilters}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center"
                  title="Clear filters"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredGalleryItems.length === 0 ? (
          <GalleryEmptyState
            hasFilters={searchTerm || categoryFilter !== "all"}
            onClear={clearFilters}
            onAdd={() => setIsAddModalOpen(true)}
          />
        ) : (
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredGalleryItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Image Preview */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.heading}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.innerHTML = `
                          <div class="flex items-center justify-center h-full">
                            <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                        `;
                      }}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(
                          item.category,
                        )}`}
                      >
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                    </div>
                    {/* Actions Overlay */}
                    <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditGalleryItem(item)}
                        className="p-2 rounded-lg bg-white/90 text-slate-600 hover:text-blue-600 hover:bg-white transition-colors shadow-sm"
                        title="Edit image"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGalleryItem(item)}
                        className="p-2 rounded-lg bg-white/90 text-slate-600 hover:text-red-600 hover:bg-white transition-colors shadow-sm"
                        title="Delete image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-800 mb-1 truncate">
                      {item.heading}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {item.subHeading}
                    </p>
                    <p className="text-xs text-slate-400">
                      Added: {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Image Modal */}
      {isAddModalOpen && (
        <GalleryFormModal
          mode="add"
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddGalleryItem}
        />
      )}

      {/* Edit Image Modal */}
      {isEditModalOpen && editingItem && (
        <GalleryFormModal
          mode="edit"
          item={editingItem}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingItem(null);
          }}
          onSave={handleSaveGalleryItem}
        />
      )}

      {/* Delete Image Modal */}
      {isDeleteModalOpen && deletingItem && (
        <DeleteGalleryModal
          item={deletingItem}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingItem(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Notification */}
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-3 rounded-xl shadow-lg text-sm font-medium z-50 ${
            notification.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

// Gallery Form Modal Component
const GalleryFormModal = ({ mode, item, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    image: item?.image || "",
    heading: item?.heading || "",
    subHeading: item?.subHeading || "",
    category: item?.category || "Workplace",
  });
  const [imagePreview, setImagePreview] = useState(item?.image || "");
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.image) newErrors.image = "Image is required";
    if (!formData.heading.trim()) newErrors.heading = "Heading is required";
    if (!formData.subHeading.trim())
      newErrors.subHeading = "SubHeading is required";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    const galleryData = {
      ...formData,
      id: item?.id || `GAL${String(Date.now()).slice(-6)}`,
      createdAt: item?.createdAt || new Date().toISOString().split("T")[0],
    };
    await onSave(galleryData);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {mode === "add" ? "Add Gallery Image" : "Edit Gallery Image"}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              {mode === "add"
                ? "Upload a new gallery image"
                : "Update gallery image details"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Upload Image *
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                errors.image
                  ? "border-red-300"
                  : "border-slate-200 hover:border-blue-400"
              }`}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview("");
                      setFormData({ ...formData, image: "" });
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-600 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-6">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {errors.image && (
              <p className="text-xs text-red-600 mt-1">{errors.image}</p>
            )}
          </div>

          {/* Heading */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Heading *
            </label>
            <input
              type="text"
              value={formData.heading}
              onChange={(e) =>
                setFormData({ ...formData, heading: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.heading ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
              placeholder="e.g., Building Better Careers"
            />
            {errors.heading && (
              <p className="text-xs text-red-600 mt-1">{errors.heading}</p>
            )}
          </div>

          {/* SubHeading */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              SubHeading *
            </label>
            <textarea
              value={formData.subHeading}
              onChange={(e) =>
                setFormData({ ...formData, subHeading: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.subHeading ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
              rows="2"
              placeholder="e.g., Helping professionals grow and achieve their career goals"
            />
            {errors.subHeading && (
              <p className="text-xs text-red-600 mt-1">{errors.subHeading}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.category ? "border-red-300" : "border-slate-200"
              } focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm`}
            >
              <option value="Workplace">Workplace</option>
              <option value="Career">Career</option>
              <option value="Professionals">Professionals</option>
              <option value="Learning">Learning</option>
            </select>
            {errors.category && (
              <p className="text-xs text-red-600 mt-1">{errors.category}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 w-full sm:w-auto"
            >
              <Save className="w-4 h-4" />
              {isSaving
                ? "Saving..."
                : mode === "add"
                  ? "Add Image"
                  : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Gallery Modal Component
const DeleteGalleryModal = ({ item, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-50 rounded-full p-3 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900">
                Delete Image?
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Are you sure you want to delete this image? This action cannot
                be undone.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.heading}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  {item.heading}
                </p>
                <p className="text-xs text-slate-500">{item.category}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Deleting..." : "Delete Image"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading State Component
const GalleryLoadingState = () => (
  <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded w-32"></div>
      <div className="h-8 bg-slate-200 rounded w-64"></div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="h-4 bg-slate-200 rounded w-20 mb-4"></div>
          <div className="h-8 bg-slate-200 rounded w-12"></div>
        </div>
      ))}
    </div>
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-slate-100 rounded-xl h-48"></div>
        ))}
      </div>
    </div>
  </div>
);

// Error State Component
const GalleryErrorState = ({ error, onRetry }) => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-red-50 rounded-full p-4 mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        Failed to Load Gallery
      </h3>
      <p className="text-sm text-slate-500 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </div>
  </div>
);

// Empty State Component
const GalleryEmptyState = ({ hasFilters, onClear, onAdd }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="bg-slate-100 rounded-full p-4 mb-4">
      {hasFilters ? (
        <Search className="w-12 h-12 text-slate-400" />
      ) : (
        <ImageIcon className="w-12 h-12 text-slate-400" />
      )}
    </div>
    <h3 className="text-lg font-semibold text-slate-800 mb-1">
      {hasFilters ? "No images found" : "No images yet"}
    </h3>
    <p className="text-sm text-slate-500 text-center mb-4 max-w-sm">
      {hasFilters
        ? "Try adjusting your search or filter criteria."
        : "Start by adding your first gallery image."}
    </p>
    {hasFilters ? (
      <button
        onClick={onClear}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl"
      >
        Clear all filters
      </button>
    ) : (
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg"
      >
        <Plus className="w-4 h-4" />
        Add Image
      </button>
    )}
  </div>
);

export default Gallery;
