/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import AssembleLogo from "../../assets/ASSEMBLE LOGO SECONDARY 1.svg";

const FloatingLabelInput = ({
  name,
  label,
  value,
  onChange,
  as = "input",
  options = [],
  containerClassName = "",
  wordCount,
  wordLimit,
  error,
  ...props
}) => {
  const inputTextStyle = {
    fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif",
    letterSpacing: "0.04em",
    fontSize: "16px",
    lineHeight: "100%",
  };

  const labelTextStyle = {
    fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif",
    letterSpacing: "0.04em",
    lineHeight: "100%",
  };

  const commonInputStyles =
    "peer w-full h-full rounded-xl px-6 pt-6 capitalize bg-white text-[#1A1A1A] shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] focus:outline-none focus:ring-2 hover:bg-black hover:text-white transition-colors duration-200";

  const errorStyles = error
    ? "border-2 border-red-500 ring-red-500/20"
    : "focus:ring-cyan-400";

  const commonLabelStyles =
    "absolute top-1/2 left-6 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ease-in-out text-base capitalize peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-[#737373] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#737373]";

  const InputComponent = as;

  return (
    <div className={`w-full ${containerClassName}`}>
      <div className="relative h-full">
        {as === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className={`${commonInputStyles} ${errorStyles} appearance-none`}
            style={inputTextStyle}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="py-4">
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <InputComponent
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className={`${
              as === "textarea"
                ? `${commonInputStyles} resize-none pb-7`
                : commonInputStyles
            } ${errorStyles}`}
            style={inputTextStyle}
            placeholder=" "
            {...props}
          />
        )}
        <label
          htmlFor={name}
          className={commonLabelStyles}
          style={labelTextStyle}
        >
          {label}
        </label>

        {as === "textarea" && value && (
          <div
            className="absolute bottom-3 right-6 text-[10px] pointer-events-none"
            style={{ fontFamily: "'Arial Rounded MT Bold', Arial, sans-serif" }}
          >
            <span
              className={
                wordCount > wordLimit ? "text-red-500" : "text-gray-400"
              }
            >
              {wordCount} / {wordLimit}
            </span>
          </div>
        )}

        {as === "select" && (
          <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
};

const OrganizerPersonalInfo = () => {
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
    branchAddress: "",
    organizationType: "Educational Institution / University / School",
    organizationSize: "small (1 - 10)",
    websiteUrl: "",
    youtubeUrl: "",
    discordUrl: "",
    twitchUrl: "",
    instagramUrl: "",
    bio: "",
    businessGSTNumber: "",
    cin: "",
    businessPincode: "",
    businessState: "",
    businessAddressCity: "",
    businessAddress: "",
    businessContactMail: "",
    businessContactNumber: "",
    contactMembers: [{ name: "", role: "", email: "", contact: "" }],
    logoFile: null,
    bannerFile: null,
  });

  const [previewUrls, setPreviewUrls] = useState({
    logo: null,
    banner: null,
  });

  const [currentTab, setCurrentTab] = useState("personal");
  const [isBioFocused, setIsBioFocused] = useState(false);
  const [errors, setErrors] = useState({});

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  // Effect for cleaning up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrls.logo) URL.revokeObjectURL(previewUrls.logo);
      if (previewUrls.banner) URL.revokeObjectURL(previewUrls.banner);
    };
  }, []);

  const BIO_WORD_LIMIT = 200;

  const countWords = (str) => {
    if (!str || str.trim() === "") return 0;
    return str.trim().split(/\s+/).length;
  };

  const handleImageChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [`${type}File`]: file }));
      setPreviewUrls((prev) => {
        if (prev[type]) {
          URL.revokeObjectURL(prev[type]);
        }
        return { ...prev, [type]: URL.createObjectURL(file) };
      });
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "bio") {
      if (
        countWords(value) > BIO_WORD_LIMIT &&
        value.length > formData.bio.length
      ) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.contactMembers];
    updatedMembers[index][field] = value;
    setFormData((prev) => ({ ...prev, contactMembers: updatedMembers }));
  };

  const addContactMember = () => {
    setFormData((prev) => ({
      ...prev,
      contactMembers: [
        ...prev.contactMembers,
        { name: "", role: "", email: "", contact: "" },
      ],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const scriptRegex = /<script\b[^>]*>.*<\/script>/i;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numericRegex = /^[0-9]+$/;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    const FIELD_LABELS = {
      accountHolderName: "Account Holder Name",
      accountNumber: "Account Number",
      ifscCode: "IFSC Code",
      branchName: "Branch Name",
      branchAddress: "Branch Address",
      bio: "Bio",
      businessGSTNumber: "Business GST Number",
      cin: "CIN",
      businessPincode: "Business Pincode",
      businessState: "Business State",
      businessAddressCity: "Business Address City",
      businessAddress: "Business Address",
      businessContactMail: "Business Contact Mail",
      businessContactNumber: "Business Contact Number",
    };

    const checkRequired = (field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = `${FIELD_LABELS[field]} is required`;
      }
    };

    const checkMalicious = (field) => {
      if (scriptRegex.test(formData[field])) {
        newErrors[field] = `${FIELD_LABELS[field]} contains invalid characters`;
      }
    };

    ["accountHolderName", "branchName", "branchAddress", "bio"].forEach(
      (field) => {
        checkRequired(field);
        checkMalicious(field);
      }
    );

    checkRequired("accountNumber");
    if (formData.accountNumber && !numericRegex.test(formData.accountNumber)) {
      newErrors.accountNumber = `${FIELD_LABELS.accountNumber} must be numeric`;
    }

    checkRequired("ifscCode");
    if (formData.ifscCode && !ifscRegex.test(formData.ifscCode)) {
      newErrors.ifscCode = `${FIELD_LABELS.ifscCode} has an invalid format`;
    }

    if (formData.organizationType === "Gaming Organization") {
      const orgFields = [
        "businessGSTNumber",
        "cin",
        "businessPincode",
        "businessState",
        "businessAddressCity",
        "businessAddress",
      ];
      orgFields.forEach((field) => {
        checkRequired(field);
        checkMalicious(field);
      });

      checkRequired("businessContactMail");
      if (
        formData.businessContactMail &&
        !emailRegex.test(formData.businessContactMail)
      ) {
        newErrors.businessContactMail = `${FIELD_LABELS.businessContactMail} has an invalid email format`;
      }

      checkRequired("businessContactNumber");
      if (
        formData.businessContactNumber &&
        !numericRegex.test(formData.businessContactNumber.replace(/\+/g, ""))
      ) {
        newErrors.businessContactNumber = `${FIELD_LABELS.businessContactNumber} must be numeric`;
      }

      const memberErrors = [];
      formData.contactMembers.forEach((member, index) => {
        const currentMemberErrors = {};
        if (!member.name.trim()) currentMemberErrors.name = "Name is required";
        if (!member.role.trim()) currentMemberErrors.role = "Role is required";
        if (!member.email.trim()) {
          currentMemberErrors.email = "Email Address is required";
        } else if (!emailRegex.test(member.email)) {
          currentMemberErrors.email = "Email Address has an invalid format";
        }
        if (!member.contact.trim())
          currentMemberErrors.contact = "Contact Number is required";
        if (Object.keys(currentMemberErrors).length > 0) {
          memberErrors[index] = currentMemberErrors;
        }
      });
      if (memberErrors.length > 0) {
        newErrors.contactMembers = memberErrors;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {

  //   } else {

  //   }
  // };

  const bioWordCount = countWords(formData.bio);

  const navTextStyle = {
    fontFamily: "'Bebas Neue', sans-serif",
    fontWeight: 400,
    fontSize: "clamp(1rem, 0.5rem + 1.5vw, 1.5rem)",
    lineHeight: "100%",
    letterSpacing: "0.04em",
    textTransform: "capitalize",
  };

  const checkeredBackground = {
    backgroundImage: "repeating-conic-gradient(#4A4A4A 0% 25%, #383838 0% 50%)",
    backgroundSize: "20px 20px",
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-2 sm:p-4 lg:p-6 xl:p-8 bg-black">
      <div
        className="text-white flex flex-col w-full"
        style={{
          maxWidth: "1440px",
          borderRadius: "24px",
          padding: "clamp(16px, 4vw, 32px)",
          gap: "clamp(16px, 3vw, 24px)",
          background:
            "radial-gradient(50% 50% at 50% 50%, #121212 0%, #000000 100%)",
        }}
      >
        <input
          type="file"
          ref={logoInputRef}
          onChange={(e) => handleImageChange(e, "logo")}
          accept="image/*"
          className="hidden"
        />
        <input
          type="file"
          ref={bannerInputRef}
          onChange={(e) => handleImageChange(e, "banner")}
          accept="image/*"
          className="hidden"
        />
        <div
          className="flex items-center w-full"
          style={{ height: "64px", position: "relative" }}
        >
          <div className="flex-shrink-0">
            <img
              src={AssembleLogo}
              alt="Organization Logo"
              className="w-16 h-16 rounded"
            />
          </div>
          <div
            className="flex rounded-lg overflow-hidden"
            style={{
              width: "min(800px, 90vw)",
              height: "32px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <button
              className={`flex-1 transition-colors flex items-center justify-center`}
              style={{
                background:
                  currentTab === "personal" ? "#FFFFFF" : "transparent",
                color: currentTab === "personal" ? "black" : "white",
                ...(currentTab === "personal"
                  ? {
                      border: "1px solid #00FFFF",
                      boxShadow: "-3px 4px 0px 0px #000000",
                    }
                  : {
                      borderTop: "1px solid transparent",
                      borderRight: "1px solid transparent",
                      borderBottom: "1px solid white",
                      borderLeft: "1px solid white",
                      boxShadow: "none",
                    }),
                clipPath:
                  "polygon(24px 0%, 100% 0%, calc(100% - 24px) 100%, 0% 100%)",
              }}
              onClick={() => setCurrentTab("personal")}
            >
              <span style={navTextStyle}>Personal Information</span>
            </button>

            {formData.organizationType === "Gaming Organization" && (
              <button
                className={`flex-1 transition-colors flex items-center justify-center`}
                style={{
                  background:
                    currentTab === "organizational" ? "#FFFFFF" : "transparent",
                  color: currentTab === "organizational" ? "black" : "white",
                  ...(currentTab === "organizational"
                    ? {
                        border: "1px solid #00FFFF",
                        boxShadow: "-3px 4px 0px 0px #000000",
                      }
                    : {
                        borderTop: "1px solid transparent",
                        borderLeft: "1px solid transparent",
                        borderBottom: "1px solid white",
                        borderRight: "1px solid white",
                        boxShadow: "none",
                      }),
                  clipPath:
                    "polygon(24px 0%, 100% 0%, calc(100% - 24px) 100%, 0% 100%)",
                }}
                onClick={() => setCurrentTab("organizational")}
              >
                <span style={navTextStyle}>Organizational Information</span>
              </button>
            )}
          </div>
        </div>

        {currentTab === "personal" && (
          <>
            <div>
              <h2
                className="font-normal mb-1"
                style={{
                  fontSize: "24px",
                  lineHeight: "1.2",
                  fontFamily: "'Arial Rounded MT Bold', sans-serif",
                }}
              >
                Personal Information
              </h2>
              <p
                className="text-gray-400"
                style={{ fontSize: "16px", lineHeight: "1.5" }}
              >
                We Need To Collect Personal Information From The Esports
                Organizer To Showcase Your Organization's Details To Gamers.
              </p>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div
                className="w-40 lg:w-1/5 aspect-square flex-shrink-0 flex flex-col items-center justify-center rounded-xl p-2 gap-2 border border-white shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] cursor-pointer overflow-hidden"
                style={checkeredBackground}
                onClick={() => logoInputRef.current.click()}
              >
                {previewUrls.logo ? (
                  <img
                    src={previewUrls.logo}
                    alt="Logo Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Plus className="w-8 h-8 text-white" />
                    <div className="text-center">
                      <div className="text-white font-medium text-sm">
                        Add Logo Design
                      </div>
                      <div className="text-xs text-gray-300 mt-1">
                        1:1 Ratio
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div
                className="w-full lg:w-4/5 aspect-[4/1] flex flex-col items-center justify-center rounded-xl border border-white shadow-[4px_4px_20px_0px_rgba(0,0,0,0.25)] cursor-pointer overflow-hidden"
                style={checkeredBackground}
                onClick={() => bannerInputRef.current.click()}
              >
                {previewUrls.banner ? (
                  <img
                    src={previewUrls.banner}
                    alt="Banner Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <Plus className="w-8 h-8 text-white" />
                    <div className="text-center">
                      <div className="text-white font-medium mb-1">
                        Add Banner Image
                      </div>
                      <div className="text-xs text-gray-300">4:1 Ratio</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FloatingLabelInput
                containerClassName="h-14"
                name="organizationType"
                label="Type Of Organization"
                as="select"
                value={formData.organizationType}
                onChange={handleInputChange}
                options={[
                  {
                    value: "Educational Institution / University / School",
                    label: "Educational Institution / University / School",
                  },
                  {
                    value: "Gaming Organization",
                    label: "Gaming Organization",
                  },
                ]}
              />
              <FloatingLabelInput
                containerClassName="h-14"
                name="organizationSize"
                label="Organization Size"
                as="select"
                value={formData.organizationSize}
                onChange={handleInputChange}
                options={[
                  { value: "small (1 - 10)", label: "small (1 - 10)" },
                  { value: "medium (10 - 50)", label: "medium (10 - 50)" },
                  { value: "large (50+)", label: "large (50+)" },
                ]}
              />
              <FloatingLabelInput
                containerClassName="h-14"
                name="websiteUrl"
                label="Website URL (If Existed)"
                value={formData.websiteUrl}
                onChange={handleInputChange}
                error={errors.websiteUrl}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FloatingLabelInput
                containerClassName="h-14"
                name="youtubeUrl"
                label="Youtube Link (If Existed)"
                value={formData.youtubeUrl}
                onChange={handleInputChange}
                error={errors.youtubeUrl}
              />
              <FloatingLabelInput
                containerClassName="h-14"
                name="discordUrl"
                label="Discord Server (If Existed)"
                value={formData.discordUrl}
                onChange={handleInputChange}
                error={errors.discordUrl}
              />
              <FloatingLabelInput
                containerClassName="h-14"
                name="twitchUrl"
                label="Twitch Link (If Existed)"
                value={formData.twitchUrl}
                onChange={handleInputChange}
                error={errors.twitchUrl}
              />
              <FloatingLabelInput
                containerClassName="h-14"
                name="instagramUrl"
                label="Instagram Link (If Existed)"
                value={formData.instagramUrl}
                onChange={handleInputChange}
                error={errors.instagramUrl}
              />
            </div>
            <FloatingLabelInput
              containerClassName={`w-full ${
                isBioFocused || formData.bio ? "h-[200px]" : "h-14"
              } transition-all duration-300 ease-in-out`}
              name="bio"
              label="Bio"
              as="textarea"
              value={formData.bio}
              onChange={handleInputChange}
              onFocus={() => setIsBioFocused(true)}
              onBlur={() => setIsBioFocused(false)}
              wordCount={bioWordCount}
              wordLimit={BIO_WORD_LIMIT}
              error={errors.bio}
            />

            <div>
              <h2
                className="font-normal mb-2"
                style={{
                  fontSize: "24px",
                  lineHeight: "1.2",
                  fontFamily: "'Arial Rounded MT Bold', sans-serif",
                }}
              >
                Payment Information
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                We Need To Collect Personal Information From The Esports
                Organizer To Showcase Your Organization&apos;s Details To
                Gamers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FloatingLabelInput
                containerClassName="h-14"
                name="accountHolderName"
                label="Account Holder Name"
                value={formData.accountHolderName}
                onChange={handleInputChange}
                error={errors.accountHolderName}
              />
              <FloatingLabelInput
                containerClassName="h-14"
                name="accountNumber"
                label="Account Number"
                value={formData.accountNumber}
                onChange={handleInputChange}
                error={errors.accountNumber}
              />
              <FloatingLabelInput
                containerClassName="h-14"
                name="ifscCode"
                label="IFSC Code"
                value={formData.ifscCode}
                onChange={handleInputChange}
                error={errors.ifscCode}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingLabelInput
                containerClassName="h-14"
                name="branchName"
                label="Branch Name"
                value={formData.branchName}
                onChange={handleInputChange}
                error={errors.branchName}
              />
              <FloatingLabelInput
                containerClassName="h-14"
                name="branchAddress"
                label="Branch Address"
                value={formData.branchAddress}
                onChange={handleInputChange}
                error={errors.branchAddress}
              />
            </div>
          </>
        )}

        {currentTab === "organizational" &&
          formData.organizationType === "Gaming Organization" && (
            <>
              <div>
                <h2
                  className="font-normal mb-1"
                  style={{
                    fontSize: "24px",
                    lineHeight: "1.2",
                    fontFamily: "'Arial Rounded MT Bold', sans-serif",
                  }}
                >
                  Organizational Information
                </h2>
                <p
                  className="text-gray-400"
                  style={{ fontSize: "16px", lineHeight: "1.5" }}
                >
                  We Need To Gather Information About The Organizational
                  Structure Of The Esports Organization, As We Want This Data To
                  Showcase Your Organizational Details To Gamers.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingLabelInput
                  containerClassName="h-14"
                  name="businessGSTNumber"
                  label="Business GST Number"
                  value={formData.businessGSTNumber}
                  onChange={handleInputChange}
                  error={errors.businessGSTNumber}
                />
                <FloatingLabelInput
                  containerClassName="h-14"
                  name="cin"
                  label="CIN"
                  value={formData.cin}
                  onChange={handleInputChange}
                  error={errors.cin}
                />
                <FloatingLabelInput
                  containerClassName="h-14"
                  name="businessPincode"
                  label="Business Pincode"
                  value={formData.businessPincode}
                  onChange={handleInputChange}
                  error={errors.businessPincode}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingLabelInput
                  containerClassName="h-14"
                  name="businessState"
                  label="Business State"
                  value={formData.businessState}
                  onChange={handleInputChange}
                  error={errors.businessState}
                />
                <FloatingLabelInput
                  containerClassName="h-14"
                  name="businessAddressCity"
                  label="Business Address City"
                  value={formData.businessAddressCity}
                  onChange={handleInputChange}
                  error={errors.businessAddressCity}
                />
                <FloatingLabelInput
                  containerClassName="h-14"
                  name="businessAddress"
                  label="Business Address"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  error={errors.businessAddress}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FloatingLabelInput
                  containerClassName="h-14"
                  name="businessContactMail"
                  label="Business Contact Mail"
                  value={formData.businessContactMail}
                  onChange={handleInputChange}
                  error={errors.businessContactMail}
                />
                <FloatingLabelInput
                  containerClassName="h-14"
                  name="businessContactNumber"
                  label="Business Contact Number"
                  value={formData.businessContactNumber}
                  onChange={handleInputChange}
                  error={errors.businessContactNumber}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2
                    className="font-normal"
                    style={{
                      fontSize: "24px",
                      lineHeight: "1.2",
                      fontFamily: "'Arial Rounded MT Bold', sans-serif",
                    }}
                  >
                    Business Contact Support
                  </h2>
                  <button
                    onClick={addContactMember}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors font-medium text-sm"
                  >
                    Add New Member
                  </button>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  We Need To Collect Contact Information For The Esports
                  Organization To Present Your Details Effectively To Gamers.
                </p>
                {formData.contactMembers.map((member, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4"
                  >
                    <FloatingLabelInput
                      containerClassName="h-14"
                      name="name"
                      label="Name"
                      value={member.name}
                      onChange={(_, value) =>
                        handleMemberChange(index, "name", value)
                      }
                      error={errors.contactMembers?.[index]?.name}
                    />
                    <FloatingLabelInput
                      containerClassName="h-14"
                      name="role"
                      label="Role"
                      value={member.role}
                      onChange={(_, value) =>
                        handleMemberChange(index, "role", value)
                      }
                      error={errors.contactMembers?.[index]?.role}
                    />
                    <FloatingLabelInput
                      containerClassName="h-14"
                      name="email"
                      label="Email Address"
                      value={member.email}
                      onChange={(_, value) =>
                        handleMemberChange(index, "email", value)
                      }
                      error={errors.contactMembers?.[index]?.email}
                    />
                    <FloatingLabelInput
                      containerClassName="h-14"
                      name="contact"
                      label="Contact Number"
                      value={member.contact}
                      onChange={(_, value) =>
                        handleMemberChange(index, "contact", value)
                      }
                      error={errors.contactMembers?.[index]?.contact}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

        <div className="flex gap-4 pt-4 w-full">
          {currentTab === "organizational" && (
            <button
              onClick={() => setCurrentTab("personal")}
              className="flex-1 bg-black text-white py-3 px-6 rounded border border-white hover:bg-gray-800 transition-colors font-medium"
            >
              Back To Previous Page
            </button>
          )}
          {formData.organizationType === "Gaming Organization" && (
            <button
              disabled
              className="flex-1 bg-gray-800 text-white py-3 px-6 rounded border border-gray-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Skip For Now
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 transition-colors font-medium"
          >
            Submit Account Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizerPersonalInfo;
