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

    const [filterPresense, setFilterPresense] = useState(null)

    function setPresense(id, status) {
        const newStudents = students.slice()
        for (const s of newStudents) {
            if (s.id === id) {
                s.status = status
                break
            }
        }
        setStudents(newStudents)
    }

    function addStudent(name, status) {
        setStudents([...students, {
            id: students.length + 1, // todo: zły pomysł
            name: name,
            status: status
        }])
    }

    const filteredStudents = students.filter(s => {
        if (filterPresense === null) {
            return true
        }
        return s.status === filterPresense;
    })
    return (
        <>
            <ModalStudent addStudent={addStudent}/>
            <div className="container">
                <h1 style={{textAlign: "center"}}>Lista uczniów</h1>
                <form onSubmit={(event) => event.preventDefault()}>
                    <button type="submit" className="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#exampleModal">Dodaj
                    </button>
                    <div className="mb-4">
                        <span className="mb-2 badge text-bg-primary" onClick={() => setFilterPresense(null)}>Wszyscy</span>
                        <span className="mb-2 badge text-bg-light" onClick={() => setFilterPresense(true)}>Obecni</span>
                        <span className="mb-2 badge text-bg-light" onClick={() => setFilterPresense(false)}>Nieobecni</span>
                    </div>
                    <button type="submit" className="btn btn-primary" data-bs-toggle="modal" onClick={() => copyToClipboard(students)}>Skopiuj do schowka</button>
                </form>
                {filteredStudents.length > 0 ?
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
                                <span className="badge text-bg-danger">Nieobecny</span>}</td>
                            <td>
                                {student.status === true ?
                                    <button type="button" className="btn btn-sm btn-danger" data-bs-toggle="modal" onClick={() => setPresense(student.id,false)}>Ustaw nieobecny</button>
                                :
                                    <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal" onClick={() => setPresense(student.id,true)}>Ustaw obecny</button>
                                }
                            </td>
                        </tr>))}
                        </tbody>
                    </table>
                    : <NoStudentsInfo/>}
            </div>
        </>
    )
}

async function copyToClipboard(text) {
    if (!text) throw new Error("Pusta lista");
    await navigator.clipboard.writeText(text);
    console.log("Skopiowano do schowka");
}

export default App

function NoStudentsInfo() {
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

    function handleSubmit(event) {
        event.preventDefault();
        const formName = name;
        const formPresence = presenceRef.current.value === "on";

        addStudent(formName, formPresence);
    }

    return <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
        <div className="modal-dialog">
            <form onSubmit={handleSubmit}>

                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Dodaj nowego ucznia</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="container">
                            <input type="text" className="form-control" placeholder="Imię i nazwisko:" value={name} onChange={(e) => setName(e.target.value)}/> <br/>
                            <select className="form-select" ref={presenceRef}>
                                <option>Status Obecności...</option>
                                <option value="on">Obecny</option>
                                <option value="off">Nieobecny</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Poniechaj</button>
                        <button type="submit" className="btn btn-primary">Dodaj</button>
                    </div>
                </div>
            </form>

        </div>
    </div>
}