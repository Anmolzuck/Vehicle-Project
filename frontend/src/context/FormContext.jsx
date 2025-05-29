import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheelCount: null,
    vehicleType: "",
    vehicleId: null,
    vehicleModel: "",
    startDate: null,
    endDate: null,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for the field when it's updated
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Name step
        if (!formData.firstName.trim())
          newErrors.firstName = "First name is required";
        if (!formData.lastName.trim())
          newErrors.lastName = "Last name is required";
        break;
      case 1: // Wheel count step
        if (!formData.wheelCount)
          newErrors.wheelCount = "Please select number of wheels";
        break;
      case 2: // Vehicle type step
        if (!formData.vehicleType)
          newErrors.vehicleType = "Please select a vehicle type";
        break;
      case 3: // Vehicle model step
        if (!formData.vehicleModel)
          newErrors.vehicleModel = "Please select a vehicle model";
        break;
      case 4: // Date range step
        if (!formData.startDate) newErrors.startDate = "Start date is required";
        if (!formData.endDate) newErrors.endDate = "End date is required";
        if (
          formData.startDate &&
          formData.endDate &&
          formData.startDate > formData.endDate
        ) {
          newErrors.dateRange = "End date must be after start date";
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      wheelCount: null,
      vehicleType: "",
      vehicleModel: "",
      startDate: null,
      endDate: null,
    });
    setCurrentStep(0);
    setErrors({});
  };

  const value = {
    formData,
    updateFormData,
    currentStep,
    nextStep,
    prevStep,
    errors,
    resetForm,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
