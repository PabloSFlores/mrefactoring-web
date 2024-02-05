import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";
import { useEffect, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { Toast } from "primereact/toast";
import { blobToBase64 } from "../../../kernel/functions";

const Refactorizacion = () => {
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
    { id: 1, name: 'Protección Modular', value: 'Protección Modular' },
    { id: 2, name: 'Carencia de abstracción', value: 'Carencia de abstracción' },
    { id: 3, name: 'Herencia de implementación', value: 'Herencia de implementación' }
  ];

  // Effects
  // Effect para guardar el payload
  useEffect(() => {
    setPayload(() => ({ files: selectedFiles, metrics: selectedMetrics }));
  }, [selectedMetrics, selectedFiles]);

  // - - - START / DROPZONE - - -
  // validación de archivo .java es el filtrador
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const javaFiles = acceptedFiles.filter((file) =>
        file.name.toLowerCase().endsWith(".java")
      );

      const uniqueJavaFiles = [];
      const duplicateNames = [];

      for (const file of javaFiles) {
        const isNameDuplicate =
          uniqueJavaFiles.some(
            (uniqueJavaFile) => uniqueJavaFile.name === file.name
          ) ||
          selectedFiles.some((selectedFile) => selectedFile.name === file.name);

        if (!isNameDuplicate) {
          const base64 = await blobToBase64(file, "text/x-java-source");
          const newSelectedFile = {
            name: file.name,
            size: file.size,
            base64: base64,
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
            detail: `Los siguientes archivos tienen nombres duplicados: ${duplicateNames.join(
              ", "
            )}`,
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
    },
    [selectedFiles]
  );

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
          ? [
            "Herencia de implementación",
            "Carencia de abstracción",
            "Protección Modular",
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
        { 
          id: 1,
          name: "Protección Modular", 
          value: 32.5
        },
        {
          id: 2,
          name: "Carencia de abstracción",
          value: 20,
        },
        {
          id: 3,
          name: "Herencia de implementación",
          value: 45,
        },
      ];

      // Redirigir a la página de resultados y pasar los datos en la ubicación
      navigate("/calculoObtenido", { state: { result } });
    }
  };

  return (
    <div className="grid mx-5 mt-2">
      <div className="col-12">
        <h1 className="text-5xl">Refactorización</h1>
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
              disabled={
                selectedFiles.length === 0 || selectedMetrics.length === 0
              }
              className="text-2xl font-bold px-3"
              label="Refactorizar"
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
              Archivos seleccionados:{" "}
              {selectedFiles?.length > 0
                ? selectedFiles.map((file) => file.name).join(", ")
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
    </div>
  );
};

export default Refactorizacion;
