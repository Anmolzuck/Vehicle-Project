import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Stack,
} from "@mui/material";
import { useFormContext } from "../context/FormContext";
import NameStep from "./form-steps/NameStep";
import WheelCountStep from "./form-steps/WheelCountStep";
import VehicleTypeStep from "./form-steps/VehicleTypeStep";
import VehicleModelStep from "./form-steps/VehicleModelStep";
import DateRangeStep from "./form-steps/DateRangeStep";

const steps = [
  "Name",
  "Wheel Count",
  "Vehicle Type",
  "Vehicle Model",
  "Date Range",
];

const stepComponents = [
  NameStep,
  WheelCountStep,
  VehicleTypeStep,
  VehicleModelStep,
  DateRangeStep,
];

const formatDate = (dateString) => {
  const yyyy = dateString.getFullYear();
  const mm = String(dateString.getMonth() + 1).padStart(2, "0");
  const dd = String(dateString.getDate()).padStart(2, "0");

  const formattedDate = `${yyyy}-${mm}-${dd}`;
  return formattedDate;
};

const MultiStepForm = () => {
  const { currentStep, nextStep, prevStep, formData, resetForm, errors } =
    useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const {
        firstName,
        lastName,
        vehicleId,
        vehicleModel,
        vehicleType,
        wheelCount,
        startDate,
        endDate,
      } = formData;
      const requestBody = {
        userFirstName: firstName,
        userLastName: lastName,
        wheels: wheelCount,
        vehicleType: vehicleType,
        vehicleId: vehicleId,
        vehicleName: vehicleModel,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      };
      const request = await fetch(
        "http://localhost:3000/api/v1/bookings/createBooking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const response = await request.json();

      if (response.status === 500) {
        setSubmitError(response.error);
      } else setSubmitSuccess(true);
      console.log("Booking status:", response);
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNewBooking = () => {
    resetForm();
    setSubmitSuccess(false);
    setSubmitError(null);
    setIsSubmitting(false);
  };

  const CurrentStepComponent = stepComponents[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  if (submitSuccess) {
    return (
      <Box className="w-full max-w-md mx-auto p-6">
        <Paper className="p-6 text-center">
          <Stack spacing={4}>
            <Typography variant="h5" className="mb-4 text-green-600">
              Booking Submitted Successfully!
            </Typography>
            <Typography className="mb-4">
              Thank you for your booking. We will contact you shortly with more
              details.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartNewBooking}
              className="mt-4"
            >
              Start New Booking
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="w-full max-w-2xl mx-auto p-4">
      <Paper className="p-6">
        <Stepper activeStep={currentStep} className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <CurrentStepComponent />

        <Box className="flex justify-between mt-8">
          <Button
            variant="outlined"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          {isLastStep ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Booking"}
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={nextStep}>
              Next
            </Button>
          )}
        </Box>

        {submitError && (
          <Typography
            color="error"
            className="text-center"
            style={{ marginBlock: "16px" }}
          >
            {submitError}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default MultiStepForm;
