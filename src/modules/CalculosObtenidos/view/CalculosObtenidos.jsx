import { Link, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";


const CalculosObtenidos = () => {
  // Obtiene la ubicación y el estado de React Router
  const location = useLocation();
  const state = location.state;
  // Estado para almacenar el texto resultante de los cálculos
  const [resultText, setResultText] = useState("");

  // Efecto que se ejecuta cuando el estado 'state' cambia
  useEffect(() => {
    // Extrae el resultado del estado y lo convierte a una cadena con formato
    const _result = state?.result;
    setResultText(JSON.stringify(_result, null, 2));
  }, [state]);

  // Determina si la tabla debe mostrarse basándose en 'resultText'
  const showTable = resultText && resultText.length > 0;

  // Renderiza la interfaz de usuario
  return (
    <div className="grid mx-5 mt-2">
      <div className="col-6 ml-6 text-center">
        <h1 className="text-5xl">Cálculo de métricas</h1>
      </div>
      <div className="col-6 ml-6">
        {showTable ? (
          <div
            style={{
              background: "#f2f1f1",
              maxHeight: "300px",
              overflowY: "auto",
              height: "400px",
            }}
          >
            <table style={{ width: "100%", alignItems: "center" }}>
              <tbody>
                {JSON.parse(resultText).map((item) => (
                  <tr key={item.id}>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                      }}
                    >
                      <p className="ml-4 font-bold" style={{ fontSize: "20px" }}>
                        {item.name}
                      </p>
                    </td>
                    <td
                      style={{
                        textAlign: "left",
                        verticalAlign: "middle",
                      }}
                    >
                      <p className="ml-4 font-bold" style={{ fontSize: "20px" }}>
                        {item.value}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              fontSize: "20px",
            }}
          >
            <p>No hay datos para mostrar.</p>
          </div>
        )}
      </div>
      <div className="col-5">
        <div className="col-12  text-center mt-5">
          <div>
            <Link to="/">
              <Button
                className="text-2xl font-bold px-3"
                label="Regresar a la pagina principal"
              />
            </Link>
          </div>
        </div>
        <div className="col-12  text-center mt-5">
          <div>
            <Link to="/refactorizacion">
              <Button
                className="text-2xl font-bold px-15"
                label="Aplicar Refactorizacion"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculosObtenidos;