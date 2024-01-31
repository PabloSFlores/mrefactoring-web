import { Link } from "react-router-dom";
import { Button } from "primereact/button";

const CalculosObtenidos = () => {
  const result = [
    { id: 1, name: "PMFP", value: 1 },
    { id: 2, name: "PMFPR", value: 1},
    { id: 3, name: "PMFF", value: 1 },
    { id: 4, name: "TM", value: 0 },
    { id: 5, name: "TPM", value: 0 },
    { id: 6, name: "PF", value: 5 },
    { id: 7, name: "AF", value: 2 },
    { id: 8, name: "FFC", value: 4},
    { id: 9, name: "FHI", value: 6 },
    { id: 10, name: "FHIJ", value: 0 },
    { id: 11, name: "FHIAC", value: 0 },
    { id: 12, name: "FMFAC", value: 0 },
  ];

  return (
    <div className="grid mx-5 mt-2">
      <div className="col-6 ml-6 text-center">
        <h1 className="text-5xl">Cálculo de métricas</h1>
      </div>
      <div className="col-6 ml-6" >
        <div style={{ background: "#f2f1f1", maxHeight: '300px', overflowY: 'auto', height:"400px"}}>
          <table style={{ width: "100%", alignItems: "center" }}>
            <tbody>
              {result
                .filter((item) => item.value !== 0 && item.value !== null)
                .map((item) => (
                  <tr key={item.id}>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle'}}>
                      <p className="ml-4 font-bold" style={{fontSize:"20px"}}>{item.name}</p>
                    </td>
                    <td style={{ textAlign: 'left', verticalAlign: 'middle'}}>
                      <p className="ml-4 font-bold" style={{fontSize:"20px"}}>
                        {item.value}
                      </p>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-5">
        <div className="col-12  text-center mt-5">
          <div>
            <Link to="/misionVision">
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
