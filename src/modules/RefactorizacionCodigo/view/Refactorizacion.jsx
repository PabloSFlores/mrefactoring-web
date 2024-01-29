import React from 'react'
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox'
import { FileUpload } from 'primereact/fileupload'
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Refactorizacion = () => {
  const [showDivider, setShowDivider] = useState(window.innerWidth >= 768)

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

  // Valores de los checkbox
  const metrics = [
    { id: 1, name: 'Protección Modular', value: 'Protección Modular' },
    { id: 2, name: 'Carencia de abstracción', value: 'Carencia de abstracción' },
    { id: 3, name: 'Herencia de implementación', value: 'Herencia de implementación' }
  ];




  return (
    <div className="grid mx-5 mt-2">
      <div className="col-12">
        <h1 className='text-5x1'>Refactorización de código</h1>
      </div>
      <div className="col-12 text-xl text-center mb-5">
        <p>Selecciona entre cargar un proyecto completo o un archivo, según lo que necesites</p>
      </div>
      <div className="col-8 col-offset-2 text-center">
        <div className="grid">
          <div className="col-12 md:col-5 lg:col-5">
          <FileUpload
              ref={()=>{}}
              name="files"
              accept=".java"
              customUpload
              auto
              multiple
              mode="basic"
              uploadHandler={()=>{}}
              chooseOptions={{
                icon: <i className="pi pi-folder" style={{ fontSize: '2.5rem' }}></i>,
                label: <label className='text-2xl font-bold p- ml-2'>Carpeta</label>
              }} />
          </div>
          {showDivider && <Divider className='col' layout='vertical' />}
          <div className="col-12 md:col-5 lg:col-5">
            <FileUpload
              ref={()=>{}}
              name="files"
              accept=".java"
              customUpload
              auto
              mode="basic"
              uploadHandler={()=>{}}
              chooseOptions={{
                icon: <i className="pi pi-file" style={{ fontSize: '2.5rem' }}></i>,
                label: <label className='text-2xl font-bold p- ml-2'>Archivo</label>
              }} />
          </div>
        </div>
      </div>
      <Divider/>
      <div className="col-12 text-xl text-center my-2">
        <p>Elige las métricas que deseas implementar al código</p>
      </div>
      <div className="col-12 text-center text-xl mb-5">
        <div className="grid">
        <div className="col-12 mb-5">
            <Checkbox inputId="selectAll" name="selectAll" value="selectAll" onChange={()=>{}} checked={()=>{}} />
            <label htmlFor="selectAll" className="ml-2">Aplicar todas las métricas</label>
          </div>
          <div className="col-6 col-offset-3 flex flex-wrap justify-content-center align-items-center gap-5">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex align-items-center">
                <Checkbox inputId={'metric' + metric.id} name={metric.name} value={metric.value} />
                <label htmlFor={'metric' + metric.id} className="ml-2">{metric.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-12 text-center">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-6">
            <Link to="/misionVision">
              <Button className="text-2xl font-bold px-3" label='Volver a la página principal' />
            </Link>
          </div>
          <div className="col-12 md:col-6 lg:col-6">
            <Link to="/calculoObtenido">
              <Button 
                className="text-2xl font-bold px-3" label='Refactorizar' />
            </Link>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Refactorizacion