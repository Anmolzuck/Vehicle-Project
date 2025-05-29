import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useFormContext } from "../../context/FormContext";

const VehicleModelStep = () => {
  const { formData, updateFormData, errors } = useFormContext();
  const [vehicleModels, setVehicleModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleModels = async () => {
      if (formData.wheelCount && formData.vehicleType) {
        console.log(formData.vehicleType);
        setLoading(true);
        try {
          const data = await fetch(
            `http://localhost:3000/api/v1/vehicle/vehicleByType/${formData.vehicleType}`
          );
          const response = await data.json();
          setVehicleModels(response.data);
        } catch (error) {
          //console.error("Error fetching vehicle models:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVehicleModels();
  }, [formData.wheelCount, formData.vehicleType]);

  if (loading) {
    return (
      <Box className="w-full max-w-md mx-auto p-6 flex justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="w-full max-w-md mx-auto p-6">
      <Typography variant="h5" className="mb-6 text-center">
        Specific Model
      </Typography>

      <RadioGroup
        value={formData.vehicleModel}
        onChange={(e) => {
          const selectedModel = vehicleModels?.find(
            (model) => model.name === e.target.value
          );
          if (selectedModel) {
            updateFormData("vehicleModel", selectedModel.name);
            updateFormData("vehicleId", selectedModel.id);
          }
        }}
        className="flex flex-col items-center"
      >
        {vehicleModels?.map((model) => (
          <FormControlLabel
            key={model.id}
            value={model.name}
            control={<Radio />}
            label={model.name}
            className="mb-2"
          />
        ))}
      </RadioGroup>

      {errors.vehicleModel && (
        <FormHelperText error className="mt-2" style={{ textAlign: "center" }}>
          {errors.vehicleModel}
        </FormHelperText>
      )}
    </Box>
  );
};

export default VehicleModelStep;
