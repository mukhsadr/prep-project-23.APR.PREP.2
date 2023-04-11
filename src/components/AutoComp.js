import { useLoadScript } from "@react-google-maps/api";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import usePlacesAutocomplete from "use-places-autocomplete";
import "@reach/combobox/styles.css";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";

export default function AutoComp(props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    setValue("New York City");
  }, []);

  const handleSelect = async (address) => {
    setValue(address, false);
    props.cityHandler(address);
    clearSuggestions();
  };

  if (!isLoaded) {
    return (
      <div>
        {" "}
        <LoadingButton
          sx={{ bgcolor: "white", width: "220px", height: "35px" }}
          loading={true}
        ></LoadingButton>
      </div>
    );
  }
  return (
    <>
      <Combobox onSelect={handleSelect} className="locationBox">
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  className="optionBox"
                  value={description}
                  key={place_id}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </>
  );
}
