import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox'
import { FileUpload } from 'primereact/fileupload'
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Refactorizacion = () => {
  const [showDivider, setShowDivider] = useState(window.innerWidth >= 768)
  const [selectAll, setSelectAll] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [payload, setPayload] = useState({ files: [{ name: '', base64: '' }], metrics: [] })
  const fileUploadRef = useRef(null);

  // Valores de los checkbox
  const metrics = [
    { id: 1, name: 'Protección Modular', value: 'Protección Modular' },
    { id: 2, name: 'Carencia de abstracción', value: 'Carencia de abstracción' },
    { id: 3, name: 'Herencia de implementación', value: 'Herencia de implementación' }
  ];



  // Effect para mostrar u ocultar el Divider vertical
  useEffect(() => {
    const handleResize = () => {
      setShowDivider(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
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
    if (value === 'selectAll') {
      setSelectAll(checked);
      setSelectedMetrics(checked ?
        ['Herencia de implementación', 'Carencia de abstracción', 'Protección Modular']
        : []);
    } else {
      // Si es cualquier otro se usa un auxiliar
      let _selectedMetrics = [...selectedMetrics];

      // Si el valor de checked ese true se guarda en el auxiliar
      // Si no, se elmina si es que estaba
      if (checked)
        _selectedMetrics.push(value);
      else
        _selectedMetrics.splice(_selectedMetrics.indexOf(value), 1);

      // El auxiliar reemplaza al actual estado
      setSelectedMetrics(_selectedMetrics);
      // El estado de select All se vuelve falso por si desea volver a presionarlo
      setSelectAll(false);
    }
  }

  // Función del botón de caluclar Métricas
  const calculateMetrics = () => {
    console.log(payload);
  }

  // Función para manejar la carga de archivos
  const uploadFilesHandler = async (e) => {
    try {
      // Destruturar y obtener el archivo
      const { files } = e;
      // Arreglo de extensiones aceptadas
      const allowedExtensions = ['java'];
      // Obtener los archivos seleccionados actuales
      const _selectedFiles = [...selectedFiles];
      // For asíncrono para llamar al método que convierte blob a base64
      for await (let file of files) {
        // Validar que ese archivo aún no exista en el arreglo
        if (!selectedFiles.some((selectedFile) => selectedFile.name == file.name)) {
          //Obtener y validar la extensión del archivo
          const fileExtension = file.name.split(".").pop().toLowerCase();
          if (!allowedExtensions.includes(fileExtension)) {
            alert('Archivo no válido')
            // Limpiar archivos
          } else {
            // Convertir a base64 y guardarlo en el arreglo auxiliar
            const base64 = await blobToBase64(file, 'text/x-java-source');
            console.log(base64);
            const newSelectedFile = {
              name: file.name,
              base64: base64,
            }
            _selectedFiles.push(newSelectedFile)
          }
        }
      }
      // Asignar los archivos con los nuevos agregados
      setSelectedFiles(_selectedFiles)
      // Limpiar el input de archivos
      fileUploadRef.current.clear();
    } catch (error) {
      console.error('Error', error);
    }
  };

  // Función para convertir los datos blob a base64
  // Recibe el file y un argumento de mimeType para no usar un formato genérico
  const blobToBase64 = async (file, mimeType) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64data = reader.result.replace(/^data:(.*?);base64,/, `data:${mimeType};base64,`);
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
        <h1 className='text-5xl'>Refactorización de código</h1>
      </div>
      <div className="col-12 card">
        <div className="grid grid-nogutter">
          <div className="col-12 text-md">
            <h1>Resumen</h1>
          </div>
          <div className="col-12 text-lg mb-2">
            <p>Archivos seleccionados: {payload.files?.length > 0 ? payload.files.map(file => file.name).join(', ') : 'No se han seleccionado archivos'}</p>
          </div>
          <div className="col-12 text-lg mb-2">
            <p>Métricas seleccionadas: {payload.metrics?.length > 0 ? payload.metrics.join(', ') : 'No se han seleccionado métricas'}</p>
          </div>
        </div>
      </div>
      <div className="col-12 text-xl text-center mb-5">
        <p>Selecciona entre cargar un proyecto completo o un archivo, según lo que necesites</p>
      </div>
      <div className="col-8 col-offset-2 text-center">
        <div className="grid">
          <div className="col-12 md:col-5 lg:col-5">
            <FileUpload
              ref={fileUploadRef}
              name="files"
              accept=".java"
              customUpload
              auto
              multiple
              mode="basic"
              uploadHandler={uploadFilesHandler}
              chooseOptions={{
                icon: <i className="pi pi-folder" style={{ fontSize: '2.5rem' }}></i>,
                label: <label className='text-2xl font-bold p- ml-2'>Carpeta</label>
              }} />
          </div>
          {showDivider && <Divider className='col' layout='vertical' />}
          <div className="col-12 md:col-5 lg:col-5">
            <FileUpload
              ref={fileUploadRef}
              name="files"
              accept=".java"
              customUpload
              auto
              mode="basic"
              uploadHandler={uploadFilesHandler}
              chooseOptions={{
                icon: <i className="pi pi-file" style={{ fontSize: '2.5rem' }}></i>,
                label: <label className='text-2xl font-bold p- ml-2'>Archivo</label>
              }} />
          </div>
        </div>
      </div>
      <Divider />
      <div className="col-12 text-xl text-center my-2">
        <p>Elige las métricas que deseas implementar al código</p>
      </div>
      <div className="col-12 text-center text-xl mb-5">
        <div className="grid">
          <div className="col-12 mb-5">
            <Checkbox inputId="selectAll" name="selectAll" value="selectAll" onChange={onMetricsChange} checked={selectAll} />
            <label htmlFor="selectAll" className="ml-2">Aplicar todas las métricas</label>
          </div>
          <div className="col-6 col-offset-3 flex flex-wrap justify-content-center align-items-center gap-5">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex align-items-center">
                <Checkbox inputId={'metric' + metric.id} name={metric.name} value={metric.value} onChange={onMetricsChange} checked={selectedMetrics.includes(metric.name)} />
                <label htmlFor={'metric' + metric.id} className="ml-2">{metric.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-12 text-center">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-6">
            <Link to="/">
              <Button className="text-2xl font-bold px-3" label='Volver a la página principal' />
            </Link>
          </div>
          <div className="col-12 md:col-6 lg:col-6">
            <Link to="/calculoObtenido">
              <Button onClick={calculateMetrics}
                disabled={!selectedFiles.length || !selectedMetrics.length}
                className="text-2xl font-bold px-3" label='Refactorizar' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Refactorizacion