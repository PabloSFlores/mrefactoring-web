import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

const MisionVison = () => {
  return (
    <div className="grid mx-5 mt-2">
      <div className="col-12 text-center">
        <h1 className="text-5xl">Misión/Visión</h1>
      </div>

      <div className="col-12 card sombra">
        <div className="grid grid-nogutter">
          <div className="col-12 text-lg mb-2">
            <b>Misión:</b>
            <p>
              {" "}
              Mejorar la estructura y diseño del código existente, manteniendo
              su funcionalidad, para lograr un código más legible, mantenible y
              eficiente.{" "}
            </p>
          </div>
          <div className="col-12 text-lg mb-2">
            <b>Visión:</b>
            <p>
              Proporcionar herramientas y procesos que permitan a los
              desarrolladores optimizar y reestructurar el código existente de
              manera sistemática. Esto busca mejorar la calidad del software,
              reducir la deuda técnica y fomentar la evolución continua del
              código para adaptarse a los cambios en los requisitos y
              tecnologías.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="col-12 text-center">
        <div className="grid my-5">
          <div className="col-12 md:col-6 lg:col-6">
            <Link to="/calculoMetrica">
              <Button className="text-2xl font-bold px-3" label='Aplicar métricas' />
            </Link>
          </div>
          <div className="col-12 md:col-6 lg:col-6">
          <Link to="/refactorizacion">
              <Button className="text-2xl font-bold px-3" label='Aplicar refactorización' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisionVison;
