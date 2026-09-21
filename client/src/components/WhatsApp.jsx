import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919XXXXXXXXX"; // apna WhatsApp number
  const message = "Hello, I want to know more about the job opportunities.";

  const handleWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleWhatsApp}
      aria-label="Chat on WhatsApp"
      className="
        fixed
        right-5
        bottom-5
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-green-500
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:scale-110
        hover:bg-green-600
        focus:outline-none
        focus:ring-4
        focus:ring-green-200
      "
    >
      <FaWhatsapp size={28} strokeWidth={2.5} />
    </button>
  );
};

export default WhatsAppButton;