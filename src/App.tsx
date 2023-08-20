import{ useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import NextComponent from "./NextComponent";

interface FormData {
  name: string;
  number: string;
  email: string;
}

function App() {
  const [formdata, setFormdata] = useState<FormData>(() => {
    const storedData = localStorage.getItem("formData");
    console.log(storedData);
    return storedData
      ? JSON.parse(storedData)
      : { name: "", number: "", email: "" };
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formdata));
  }, [formdata]);

  function formdataHandler(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formdata);
  }

  function navigateHandler() {
    if (
      formdata.name === "" ||
      formdata.number === "" ||
      formdata.email === ""
    ) {
    } else {
      navigate("/next");
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className=" flex flex-col m-[30px] gap-10">
            <p className=" font-bold text-4xl w-full text-center underline">
              First Page
            </p>
            <form onSubmit={handleSubmit}>
              <div className=" flex flex-col w-full h-full items-center gap-[50px]">
                <TextField
                  fullWidth
                  required
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={formdata.name}
                  onChange={formdataHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Number"
                  type="tel"
                  variant="outlined"
                  name="number"
                  value={formdata.number}
                  onChange={formdataHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  name="email"
                  value={formdata.email}
                  onChange={formdataHandler}
                />
                <Button
                  className=" h-[50px] w-[15%]"
                  type="submit"
                  variant="contained"
                  onClick={navigateHandler}
                >
                  Save And Next
                </Button>
              </div>
            </form>
          </div>
        }
      />
      <Route path="/next" element={<NextComponent />} />
    </Routes>
  );
}

export default App;
