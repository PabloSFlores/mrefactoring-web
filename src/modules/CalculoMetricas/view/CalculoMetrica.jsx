import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Toast } from "primereact/toast";
import { blobToBase64 } from "../../../kernel/functions";

const CalculoMetrica = () => {
  // states
  const [selectAll, setSelectAll] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [payload, setPayload] = useState({
    files: [{ name: "", base64: "" }],
    metrics: [],
  });
  // ref
  const toast = useRef(null);
  // navigate
  const navigate = useNavigate();
  // variables
  const metrics = [
    { id: 1, name: "PMFP", value: "PMFP" },
    { id: 2, name: "PMFPR", value: "PMFPR" },
    { id: 3, name: "PMFF", value: "PMFF" },
    { id: 4, name: "TM", value: "TM" },
    { id: 5, name: "TPM", value: "TPM" },
    { id: 6, name: "PF", value: "PF" },
    { id: 7, name: "AF", value: "AF" },
    { id: 8, name: "FFC", value: "FFC" },
    { id: 9, name: "FHI", value: "FHI" },
    { id: 10, name: "FHIJ", value: "FHIJ" },
    { id: 11, name: "FHIAC", value: "FHIAC" },
    { id: 12, name: "FMFAC", value: "FMFAC" },
  ];

  // Effects
  // Effect para guardar el payload
  useEffect(() => {
    setPayload(() => ({ files: selectedFiles, metrics: selectedMetrics }));
  }, [selectedMetrics, selectedFiles]);

  // - - - START / DROPZONE - - - 
  // validación de archivo .java es el filtrador
  const onDrop = useCallback(async (acceptedFiles) => {
    const javaFiles = acceptedFiles.filter((file) =>
      file.name.toLowerCase().endsWith(".java")
    );

    const uniqueJavaFiles = [];
    const duplicateNames = [];

    for (const file of javaFiles) {
      const isNameDuplicate = uniqueJavaFiles.some((uniqueJavaFile) => uniqueJavaFile.name === file.name) ||
        selectedFiles.some((selectedFile) => selectedFile.name === file.name);

      if (!isNameDuplicate) {
        const base64 = await blobToBase64(file, 'text/x-java-source');
        const newSelectedFile = {
          name: file.name,
          size: file.size,
          base64: base64
        };
        uniqueJavaFiles.push(newSelectedFile);
      } else {
        duplicateNames.push(file.name);
      }
    }

    if (duplicateNames.length > 0) {
      toast.current.show([
        {
          severity: "warn",
          summary: "Archivos con nombres duplicados",
          detail: `Los siguientes archivos tienen nombres duplicados: ${duplicateNames.join(", ")}`,
          life: 3000,
        },
      ]);
    }

    if (uniqueJavaFiles.length > 0) {
      toast.current.show([
        {
          severity: "success",
          summary: "Archivos aceptados",
          detail: "Los archivos se seleccionaron correctamente",
          life: 3000,
        },
      ]);

      setSelectedFiles((previousFiles) => [
        ...previousFiles,
        ...uniqueJavaFiles,
      ]);
    }
  }, [selectedFiles]);

  // se coloca la parte de dropzone por medio de drops dar los valores aceptados que este mismo
  // filtrara
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  // - - - END / DROPZONE - - - 

  // Funciones
  // Función para verificar los checkboxes
  const onMetricsChange = (e) => {
    // Obtener valores del evento
    const { checked, value } = e;
    // Si el valor es el de aplicar todas
    // Se guarda el valor se checked en el estado de selectAll y si es true se
    // guardaan todas las métricas en el estado de métricas seleccionadas
    if (value === "selectAll") {
      setSelectAll(checked);
      setSelectedMetrics(
        checked
          ? ["PMFP", "PMFPR", "PMFF", "TM", "TPM", "PF", "AF", "FFC", "FHI", "FHIJ", "FHIAC", "FMFAC"]
          : []
      );
    } else {
      // Si es cualquier otro se usa un auxiliar
      let _selectedMetrics = [...selectedMetrics];

      // Si el valor de checked ese true se guarda en el auxiliar
      // Si no, se elmina si es que estaba
      if (checked) _selectedMetrics.push(value);
      else _selectedMetrics.splice(_selectedMetrics.indexOf(value), 1);

      // El auxiliar reemplaza al actual estado
      setSelectedMetrics(_selectedMetrics);
      // El estado de select All se vuelve falso por si desea volver a presionarlo
      setSelectAll(false);
    }
  };

  // AQUI COLOCA EL PAYLOAD bueno lo saque del video creo te da la lista de los archivos
  const handleSubmit = async () => {
    // Validar que haya archivos y métricas seleccionadas
    if (selectedFiles.length > 0 && selectedMetrics.length > 0) {
      console.log(payload);
      console.log(JSON.stringify(payload));

      /**Petición para el BACKEND
       * 
       * 
       * 
       * 
       * **/

      // recibir respuesta y enviarla por props a la vista de resultados
      const result = [
        { id: 1, name: "PMFP", value: 1 },
        { id: 2, name: "PMFPR", value: 1 },
        { id: 3, name: "PMFF", value: 1 },
        { id: 4, name: "TM", value: 0 },
        { id: 5, name: "TPM", value: 0 },
        { id: 6, name: "PF", value: 5 },
        { id: 7, name: "AF", value: 2 },
        { id: 8, name: "FFC", value: 4 },
        { id: 9, name: "FHI", value: 6 },
        { id: 10, name: "FHIJ", value: 0 },
        { id: 11, name: "FHIAC", value: 0 },
        { id: 12, name: "FMFAC", value: 0 },
      ];

      // Redirigir a la página de resultados y pasar los datos en la ubicación
      navigate('/calculoObtenido', { state: { result } });
    }
  };


  return (
    <div className="grid mx-5 mt-2">
      <div className="col-12">
        <h1 className="text-5xl">Cálculo de métricas</h1>
      </div>
      <Toast ref={toast} />
      <div className="col-12 text-xl text-center mb-5">
        <p>
          Selecciona entre cargar un proyecto completo o un archivo, según lo
          que necesites.
        </p>
      </div>
      {/* Botones de archivos */}
      <div className="col-8 col-offset-2 text-center">
        <div className="grid">
          <div className="col-12 md:col-12 lg:col-12">
            {/* Aquí se coloca el dropZone */}
            <div className="col-12 card sombra text-center">
              <h1 className="title text-3xl font-bold">SUBIR ARCHIVOS</h1>
              <section>
                <div {...getRootProps({})} className="container-field">
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center gap-4">
                    <i
                      className="pi pi-upload title"
                      style={{ fontSize: "2.5rem" }}
                    ></i>
                    {isDragActive ? (
                      <p>Arrastra aquí ...</p>
                    ) : (
                      <p>Arrastra aquí o haz clic para seleccionar archivos</p>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="col-12 text-xl text-center my-2">
        <p>Elige las métricas que deseas implementar al código</p>
      </div>
      {/* Métricas checkboxes */}
      <div className="col-12 text-center text-xl mb-5">
        <div className="grid">
          <div className="col-12 mb-5">
            <Checkbox
              inputId="selectAll"
              name="selectAll"
              value="selectAll"
              onChange={onMetricsChange}
              checked={selectAll}
              className="checkbox"
            />
            <label htmlFor="selectAll" className="ml-2 font-bold">
              Aplicar todas las métricas
            </label>
          </div>
          <div className="col-12 flex flex-wrap justify-content-center align-items-center gap-5 font-bold">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex align-items-center">
                <Checkbox
                  inputId={"metric" + metric.id}
                  name={metric.name}
                  value={metric.value}
                  onChange={onMetricsChange}
                  checked={selectedMetrics.includes(metric.name)}
                  className="checkbox"
                />
                <label htmlFor={"metric" + metric.id} className="ml-2">
                  {metric.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    
      {/* Botones de navegación */}
      <div className="col-12 text-center">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-6">
            <Link to="/">
              <Button
                className="text-2xl font-bold px-3"
                label="Volver a la página principal"
              />
            </Link>
          </div>
          <div className="col-12 md:col-6 lg:col-6">
            <Button
              onClick={handleSubmit}
              disabled={selectedFiles.length === 0 || selectedMetrics.length === 0}
              className="text-2xl font-bold px-3"
              label="Calcular métricas"
            />
          </div>
        </div>
      </div>
        {/* Resumen */}
        <div className="col-12 card">
        <div className="grid grid-nogutter">
          <div className="col-12 text-md">
            <h1>Resumen</h1>
          </div>
          <div className="col-12 text-lg mb-2">
            <p>
              Archivos seleccionados: {selectedFiles?.length > 0
                ? selectedFiles.map((file) => file.name).join(", ")
                : "No se han seleccionado archivos"}
            </p>
          </div>
          <div className="col-12 text-lg mb-2">
            <p>
              Métricas seleccionadas: {payload.metrics?.length > 0
                ? payload.metrics.join(", ")
                : "No se han seleccionado métricas"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculoMetrica;
