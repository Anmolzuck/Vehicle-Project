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

const VehicleTypeStep = () => {
  const { formData, updateFormData, errors } = useFormContext();
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      if (formData.wheelCount) {
        setLoading(true);
        try {
          const data = await fetch(
            `http://localhost:3000/api/v1/vehicle/vehicleByWheels/${formData.wheelCount}`
          );
          const response = await data.json();
          setVehicleTypes(response.data);
        } catch (error) {
          console.error("Error fetching vehicle types:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVehicleTypes();
  }, [formData.wheelCount]);

  // console.log("state", vehicleTypes);

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
        Type of vehicle
      </Typography>

      <RadioGroup
        value={formData.vehicleType}
        onChange={(e) => updateFormData("vehicleType", e.target.value)}
        className="flex flex-col items-center"
      >
        {vehicleTypes?.map((vehicle) => (
          <FormControlLabel
            key={vehicle.type}
            value={vehicle.type}
            control={<Radio />}
            label={vehicle.type}
            className="mb-2"
          />
        ))}
      </RadioGroup>

      {errors.vehicleType && (
        <FormHelperText error className="mt-2" style={{ textAlign: "center" }}>
          {errors.vehicleType}
        </FormHelperText>
      )}
    </Box>
  );
};

export default VehicleTypeStep;
