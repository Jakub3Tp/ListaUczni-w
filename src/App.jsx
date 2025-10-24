import './App.css'
import {useRef, useState} from "react";

function App() {
    const [students, setStudents] = useState([
        {
            id: 1,
            name: "Marcin Kuźnik",
            status: true
        },
        {
            id: 2,
            name: "Martyna Woźniak",
            status: true
        },
        {
            id: 3,
            name: "Karol Domagała",
            status: false
        }
    ])

    function addStudent(name, status) {
        setStudents([...students, {
            id: students.length + 1, // todo: zły pomysł
            name: name,
            status: status
        }])
    }
    return (
        <>
            <ModalStudent/>
            <div className="container">
                <h1 style={{textAlign: "center"}}>Lista uczniów</h1>
                <form onSubmit={(event) => event.preventDefault()}>
                    <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Dodaj</button>
                </form>
                {students.length > 0 ?
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Imię</th>
                        <th scope="col">Status</th>
                        <th scope="col">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student) => (<tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.status === true ?
                            <span className="badge text-bg-success">Obecny</span> :
                            <span className="badge text-bg-danger">Nieobecny</span> }</td>
                        <td>...</td>
                    </tr>))}
                    </tbody>
                </table>
                : <NoStudentsInfo />}
            </div>
        </>
    )
}

export default App

function NoStudentsInfo(){
    return <div className="d-flex text-center border rounded">
        <div className="container" style={{padding: '100px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor"
                 className="bi bi-person-exclamation" viewBox="0 0 16 16">
                <path
                    d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"></path>
                <path
                    d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"></path>
            </svg>
            <p>Brak uczniów</p>
        </div>
    </div>
}

function ModalStudent({addStudent}) {
    const [name, setName] = useState('')
    const presenceRef = useRef();

    function handleSubmit(event){
        event.preventDefault();
        const formName = name;
        const formPresence = presenceRef.currentvalue === "on";

        addStudent(formName, formPresence);
    }

    return <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Dodaj nowego ucznia</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <div className="container">
                            <input type="text" className="form-control" placeholder="Imię i nazwisko:"/> <br/>
                            <select className="form-select">
                                <option selected>Status Obecności...</option>
                                <option value="on">Obecny</option>
                                <option value="off">Nieobecny</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Poniechaj</button>
                    <button type="button" className="btn btn-primary">Dodaj</button>
                </div>
            </div>
        </div>
    </div>
}