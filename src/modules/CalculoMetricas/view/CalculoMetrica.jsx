import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import  { useDropzone } from "react-dropzone";

const CalculoMetrica = ({ className }) => {
  const [showDivider, setShowDivider] = useState(window.innerWidth >= 768);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [payload, setPayload] = useState({
    files: [{ name: "", base64: "" }],
    metrics: [],
  });
  // implementación del dropzone
  const [files, setFiles] = useState([]);

// validación de archivo .java es el filtrador
  const onDrop = useCallback((acceptedFiles) => {
    const javaFiles = acceptedFiles.filter((file) =>
      file.name.toLowerCase().endsWith(".java")
    );
// verifica si este se encuntra vacio o no
    if (javaFiles.length > 0) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...javaFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  // se coloca la parte de dropzone por medio de drops dar los valores aceptados que este mismo 
  // filtrara
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".java",
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  //  termina el uso de dropzone



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

  // Effect para mostrar u ocultar el Divider vertical
  useEffect(() => {
    const handleResize = () => {
      setShowDivider(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setPayload(() => ({ files: selectedFiles, metrics: selectedMetrics }));
  }, [selectedMetrics, selectedFiles]);

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
          ? [
              "PMFP",
              "PMFPR",
              "PMFF",
              "TM",
              "TPM",
              "PF",
              "AF",
              "FFC",
              "FHI",
              "FHIJ",
              "FHIAC",
              "FMFAC",
            ]
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

  // Función del botón de caluclar Métricas
  const calculateMetrics = () => {
    console.log(payload);
  };

  // Función para manejar la carga de archivos
  const uploadFilesHandler = async (e) => {
    try {
      const { files } = e;
      const allowedExtensions = ["java"];
      const _selectedFiles = [...selectedFiles];

      // Verificar duplicados y extensiones permitidas
      const newFiles = Array.from(files).filter((file) => {
        const isDuplicate = _selectedFiles.some(
          (selectedFile) => selectedFile.name === file.name
        );
        const isValidExtension = allowedExtensions.includes(
          file.name.split(".").pop().toLowerCase()
        );
        return !isDuplicate && isValidExtension;
      });

      // Convertir a base64 y agregar nuevos archivos
      for (const file of newFiles) {
        const base64 = await convertBlobToBase64(file, "text/x-java-source");
        _selectedFiles.push({
          name: file.name,
          base64: base64,
        });
      }

      setSelectedFiles(_selectedFiles);
      fileUploadRef.current.clear();
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Función para convertir los datos blob a base64
  // Recibe el file y un argumento de mimeType para no usar un formato genérico
  const blobToBase64 = async (file, mimeType) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64data = reader.result.replace(
          /^data:(.*?);base64,/,
          `data:${mimeType};base64,`
        );
        resolve(base64data);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };



  return (
    <div className="grid mx-5 mt-2">
      <div className="col-12">
        <h1 className="text-5xl">Cálculo de métricas</h1>
      </div>
     
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
                <div
                  {...getRootProps({
                    className: className,
                  })}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "200px", // Ajusta la altura según tus necesidades
                    border: "2px dashed #ccc", // Un borde punteado para resaltar el área de carga
                  }}
                >
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
            <label htmlFor="selectAll" className="ml-2">
              Aplicar todas las métricas
            </label>
          </div>
          <div className="col-6 col-offset-3 flex flex-wrap justify-content-center align-items-center gap-5">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex align-items-center">
                <Checkbox
                  inputId={"metric" + metric.id}
                  name={metric.name}
                  value={metric.value}
                  onChange={onMetricsChange}
                  checked={selectedMetrics.includes(metric.name)}
                />
                <label htmlFor={"metric" + metric.id} className="ml-2">
                  {metric.name}
                </label>
              </div>
            ))}
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
              Archivos seleccionados:{" "}
              {files?.length > 0
                ? files.map((file) => file.name).join(", ")
                : "No se han seleccionado archivos"}
            </p>
          </div>
          <div className="col-12 text-lg mb-2">
            <p>
              Métricas seleccionadas:{" "}
              {payload.metrics?.length > 0
                ? payload.metrics.join(", ")
                : "No se han seleccionado métricas"}
            </p>
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
            <Link to="/calculoObtenido">
              <Button
                onClick={calculateMetrics}
                disabled={!selectedFiles.length || !selectedMetrics.length}
                className="text-2xl font-bold px-3"
                label="Calcular métricas"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculoMetrica;
