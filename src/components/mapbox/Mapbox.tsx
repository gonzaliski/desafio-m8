import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { SecondaryButton } from "../../ui/buttons";
import { FormInput } from "../../components/formInput/FormInput";
import css from "./mapbox.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiemFwYWlhZGV2IiwiYSI6ImNreTF1cnZ5YTBlcWMyd3NjbGhxcnV6ZmkifQ.ZmsUrIAbUSkznfj8e97tmQ",
});

function MapboxSeach(props: MapBoxSearchProps) {
  const { onChange, register, error } = props;
  if (register)
    register("locationName", {
      onChange: (e: any) => {
        inputChangeHandler(e);
      },
    });
  const [query, setQuery] = useState("");
  // lo seteo any porque la prop "center" de Map se queja
  const initialCoords: any = [-58.381635, -34.603577];
  const [coords, setCoords] = useState(initialCoords);

  async function search() {
    const data = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=pk.bf4604bc2b3ea328e732de26a4387fa9&q=${
        query || props.defaultValue
      }&format=json`
    ).then((r) => r.json());
    console.log(data);

    const lat = parseFloat(data[0].lat);
    const lng = parseFloat(data[0].lon);
    const newCoords = [lng, lat];
    setCoords(newCoords);
    // lo "tiro" hacia arriba para que reciban las coordenadas desde "afuera"
    if (onChange) {
      onChange({
        query: query,
        coords: newCoords,
      });
    }
  }

  function inputChangeHandler(e) {
    setQuery(e.target.value);
  }

  function buttonPressHandler(e) {
    e.preventDefault();
    search();
  }

  function keydownInputHandler(e) {
    // si no es con form, tengo que agregar esto
    if (e.key == "Enter") {
      // evito que se dispare el submit
      e.preventDefault();
      search();
    }
  }

  useEffect(() => {
    if (props.defaultValue) {
      setQuery(props.defaultValue);
      search();
    }
  }, [props.defaultValue]);

  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "300px",
          width: "100%",
        }}
        zoom={[14]}
        center={coords}
        movingMethod="flyTo"
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "veterinary-11", "icon-size": 1.5 }}
        >
          <Feature coordinates={coords} />
        </Layer>
      </Map>
      <div className={css["container"]}>
        <FormInput
          {...(register ? { ...register("locationName") } : "")}
          type="text"
          onKeyDown={keydownInputHandler}
          value={query}
          label="Ubicacion"
          error={error}
        />
        <SecondaryButton onClick={buttonPressHandler} type="button">
          Buscar
        </SecondaryButton>
      </div>
    </div>
  );
}

export { MapboxSeach as default };
