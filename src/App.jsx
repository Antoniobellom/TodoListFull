import { useEffect, useState } from "react";

function App() {
  const [libros, setLibros] = useState([]);
  const [tareas, setTareas] = useState("");

  const url = "https://assets.breatheco.de/apis/fake/todos/user/alfredo";

  const inicioLibro = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(libros),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((resp) => {
        console.log(resp);
        if (!resp.msg) obtenerDatos();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const obtenerDatos = async () => {
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    const user = await data.json();
    if (user.msg) inicioLibro();
    setLibros(user);
  };

  useEffect(() => {
    /* inicioLibro(); */
    obtenerDatos();
  }, []);

  const insertar = (e) => {
    e.preventDefault();
    setLibros((schdule) => [...schdule, { label: tareas, done: false }]);
    setTareas("");
    actualizar([...libros, { label: tareas, done: false }]);
    console.log(libros);
  };

  const handleText = (e) => {
    setTareas((e.target.tareas = e.target.value));
  };

  const eliminar = (item, i) => {
    const nuevoLibro = libros.filter((item, index) => index !== i);
    setLibros(nuevoLibro);
    actualizar(nuevoLibro);
  };

  const vaciarAgenda = () => {
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((resp) => {
        console.log(resp);
        if (!resp.msg) obtenerDatos();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const actualizar = (setter) => {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(setter),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const agendaTotal = libros.length;

  return (
    <>
      <main className="bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-6 mx-auto text-light text-center py-5">
              <form id="formulario" onSubmit={insertar}>
                <h1>
                  Todos Task <i className="bi bi-list-check text-warning"></i>
                </h1>
                <input
                  className="form-control mb-5 rounded w-100 py-2 bg-light"
                  type="text"
                  name="newtareas"
                  id="newtareas"
                  value={tareas}
                  onChange={handleText}
                />
              </form>
              <table className="table bg-dark">
                <thead></thead>
                <tbody>
                  {libros.length > 0 && libros.map((item, i) => (
                    <tr className="py-3" key={i}>
                      <td className="text-light">{item.label}</td>
                      <th>
                        <i
                          type="button"
                          className="bi bi-x-circle text-warning"
                          onClick={() => eliminar(item.label, i)}
                        ></i>
                      </th>
                    </tr>
                  ))}
                  <tr>
                    <td className="text-dark bg-warning fw-bold ">
                      <i className="bi bi-list-stars h5"> {agendaTotal}</i>{" "}
                    </td>
                    <th className="text-dark bg-warning fw-bold">
                      <i
                        className="bi bi-trash-fill h5"
                        type="button"
                        onClick={() => vaciarAgenda()}
                      ></i>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
