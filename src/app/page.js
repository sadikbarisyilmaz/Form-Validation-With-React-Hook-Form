"use client";
import { useForm, Controller } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormGroup,
  RadioGroup,
  Radio,
  TextField,
  Button,
  FormControlLabel,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstname: yup
      .string()
      .required("First Name is a required field")
      .matches(/^[a-z ,.'-]+$/i, "First Name is Not Valid !"),
    lastname: yup
      .string()
      .required("Last Name is a required field")
      .matches(/^[a-z ,.'-]+$/i, "Last Name is Not Valid !"),
    email: yup
      .string()
      .required("E-Mail is a required field")
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "E-Mail is Not Valid !"
      ),
    phone: yup
      .string()
      .required("Phone Number is a required field")
      .matches(
        /^(((\+|00)?(90)|0)[-| ]?)?((5\d{2})[-| ]?(\d{3})[-| ]?(\d{2})[-| ]?(\d{2}))$/,
        "Phone Number is Not Valid !"
      ),
  })
  .required();

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      English: true,
      Turkish: false,
      Sindarin: false,
      gender: "Male",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const personalData = `
    Frist Name: ${data.firstname}
    Last Name: ${data.lastname}
    E-Mail: ${data.email}
    Phone Number: ${data.phone}
    Gender: ${data.gender}
    Language: ${data.English ? "English" : ""} ${
      data.Turkish ? "Turkish" : ""
    } ${data.Sindarin ? "Sindarin" : ""}
    `;
    alert(personalData);
    console.log(personalData);
  };

  const inputStyles = {
    color: "white",
    borderBottom: "solid rgb(156, 163, 175) 1px",
    input: {
      color: `rgb(156, 163, 175)`,
      paddingLeft: "6px",
    },
    label: { color: `rgb(156, 163, 175)` },
  };
  return (
    <div className="flex p-2 h-screen justify-center items-center">
      <main className="w-5/6 max-w-lg gap-6 flex flex-col justify-center p-6">
        <h1 className="text-3xl self-center font-bold">Personal Info</h1>
        <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoComplete="off"
            sx={inputStyles}
            id="standard-basic"
            label="First Name"
            variant="standard"
            name="firstname"
            placeholder="John"
            {...register("firstname")}
          />
          <p className="text-red-800">{errors.firstname?.message}</p>

          <TextField
            autoComplete="off"
            sx={inputStyles}
            id="standard-basic"
            label="Last Name"
            variant="standard"
            name="lastname"
            placeholder="Doe"
            {...register("lastname")}
          />
          <p className="text-red-800">{errors.lastname?.message}</p>

          <TextField
            autoComplete="off"
            sx={inputStyles}
            id="standard-basic"
            label="E-Mail"
            variant="standard"
            placeholder="example@example.com"
            name="email"
            {...register("email")}
          />
          <p className="text-red-800">{errors.email?.message}</p>

          <TextField
            autoComplete="off"
            sx={inputStyles}
            id="standard-basic"
            label="Phone Number"
            variant="standard"
            placeholder="(543) 456-78-90"
            name="phone"
            {...register("phone")}
          />
          <p className="text-red-800">{errors.phone?.message}</p>

          <FormControl>
            <label className="text-lg mt-3">Gender</label>
            <Controller
              rules={{ required: true }}
              control={control}
              name="gender"
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="Male"
                    control={
                      <Radio
                        sx={{ color: "rgb(156, 163, 175)" }}
                        size="small"
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={
                      <Radio
                        sx={{ color: "rgb(156, 163, 175)" }}
                        size="small"
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="Other"
                    control={
                      <Radio
                        sx={{ color: "rgb(156, 163, 175)" }}
                        size="small"
                      />
                    }
                    label="Other"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>

          <FormGroup>
            <label className="text-lg">Language</label>
            <FormControlLabel
              control={
                <Controller
                  name="English"
                  control={control}
                  render={({ field: props }) => (
                    <Checkbox
                      sx={{ color: "rgb(156, 163, 175)" }}
                      {...props}
                      checked={props.value}
                      onChange={(e) => props.onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label="English"
            />
            <FormControlLabel
              control={
                <Controller
                  name="Turkish"
                  control={control}
                  render={({ field: props }) => (
                    <Checkbox
                      sx={{ color: "rgb(156, 163, 175)" }}
                      {...props}
                      checked={props.value}
                      onChange={(e) => props.onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label="Turkish"
            />

            <FormControlLabel
              control={
                <Controller
                  name="Sindarin"
                  control={control}
                  render={({ field: props }) => (
                    <Checkbox
                      sx={{ color: "rgb(156, 163, 175)" }}
                      {...props}
                      checked={props.value}
                      onChange={(e) => props.onChange(e.target.checked)}
                    />
                  )}
                />
              }
              label="Sindarin"
            />
          </FormGroup>

          <Button
            sx={{
              color: "white",
              border: "solid rgb(156, 163, 175) 1px",
            }}
            type="submit"
            variant="outlined"
          >
            Submit
          </Button>
        </form>
      </main>
    </div>
  );
}
