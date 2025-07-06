"use client";
import { useState, FormEvent } from "react";

type BookingType = "football" | "wedding" | "birthday" | "corporate" | "other";

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  type: BookingType;
  guests: number;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  guests?: string;
  general?: string;
}

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    type: "football",
    guests: 0,
    message: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required";
    } else if (new Date(formData.date) < new Date()) {
      newErrors.date = "Event date cannot be in the past";
    }

    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = "Number of guests must be at least 1";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          type: "football",
          guests: 0,
          message: "",
        });

        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitStatus("error");
        setErrors({ general: errorData.message || "Failed to submit booking" });
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="w-full bg-[#FAF3EB] px-4 py-20 md:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 text-center text-4xl font-bold italic md:text-6xl">
          Book Your Event
        </h2>
        <p className="mb-12 text-center text-lg text-stone-600">
          Whether it's a wedding, birthday celebration, or a football match,
          we're here to make your event special.
        </p>

        <div className="space-y-6">
          {/* Personal Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Full Name *
              </label>
              <input
                id="name"
                type="text"
                required
                disabled={isSubmitting}
                className={`w-full border-b-2 bg-transparent px-1 py-3 transition-all outline-none focus:border-gray-800 disabled:opacity-50 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p
                  id="name-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={isSubmitting}
                className={`w-full border-b-2 bg-transparent px-1 py-3 transition-all outline-none focus:border-gray-800 disabled:opacity-50 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Phone *
              </label>
              <input
                id="phone"
                type="tel"
                required
                disabled={isSubmitting}
                className={`w-full border-b-2 bg-transparent px-1 py-3 transition-all outline-none focus:border-gray-800 disabled:opacity-50 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p
                  id="phone-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Event Date *
              </label>
              <input
                id="date"
                type="date"
                required
                disabled={isSubmitting}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full border-b-2 bg-transparent px-1 py-3 transition-all outline-none focus:border-gray-800 disabled:opacity-50 ${
                  errors.date ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                aria-describedby={errors.date ? "date-error" : undefined}
              />
              {errors.date && (
                <p
                  id="date-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.date}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="guests"
                className="mb-2 block text-sm font-medium text-gray-800"
              >
                Number of Guests *
              </label>
              <input
                id="guests"
                type="number"
                required
                min="1"
                max="1000"
                disabled={isSubmitting}
                className={`w-full border-b-2 bg-transparent px-1 py-3 transition-all outline-none focus:border-gray-800 disabled:opacity-50 ${
                  errors.guests ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.guests || ""}
                onChange={(e) =>
                  handleInputChange("guests", parseInt(e.target.value) || 0)
                }
                aria-describedby={errors.guests ? "guests-error" : undefined}
              />
              {errors.guests && (
                <p
                  id="guests-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {errors.guests}
                </p>
              )}
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label
              htmlFor="type"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Event Type *
            </label>
            <select
              id="type"
              required
              disabled={isSubmitting}
              className="w-full border-b-2 border-gray-300 bg-transparent px-1 py-3 transition-all outline-none focus:border-gray-800 disabled:opacity-50"
              value={formData.type}
              onChange={(e) =>
                handleInputChange("type", e.target.value as BookingType)
              }
            >
              <option value="football">Football Match</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="corporate">Corporate Event</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-800"
            >
              Additional Details
            </label>
            <textarea
              id="message"
              disabled={isSubmitting}
              className="w-full border-b-2 border-gray-300 bg-transparent px-1 py-3 transition-all outline-none focus:border-gray-800 disabled:opacity-50"
              rows={4}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell us more about your event..."
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center bg-black px-8 py-3 font-medium text-white transition-all hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Book Now"
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus && (
            <div
              className={`mt-4 rounded-lg p-4 text-center ${
                submitStatus === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
              role="alert"
            >
              {submitStatus === "success"
                ? "Thank you! We'll get back to you soon."
                : errors.general || "Something went wrong. Please try again."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
