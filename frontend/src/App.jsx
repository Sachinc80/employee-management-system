import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const API = 'https://employee-management-system-eu53.onrender.com/api/employees'

const emptyForm = { name: '', email: '', department: 'IT', salary: '' }

export default function App() {
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const loadEmployees = async () => {
    try {
      const { data } = await axios.get(API)
      setEmployees(data)
    } catch {
      alert('Backend is not running. Start Spring Boot on port 8080.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadEmployees() }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return employees.filter(e =>
      !q || e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q)
    )
  }, [employees, search])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...form, salary: Number(form.salary) }
if (editingId !== null) {
  await axios.put(`${API}/${editingId}`, payload)
} else {
  await axios.post(API, payload)
}
      setForm(emptyForm)
      setEditingId(null)
      loadEmployees()
    } catch {
      alert('Please check the form and backend connection.')
    }
  }

  const edit = (employee) => {
    setEditingId(employee.id)
    setForm({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: employee.salary
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const remove = async (id) => {
    if (!confirm('Delete this employee?')) return
    await axios.delete(`${API}/${id}`)
    loadEmployees()
  }

  const cancelEdit = () => {
    setEditingId(null)
    setForm(emptyForm)
  }

  return (
    <div className="app">
      <header>
        <div>
          <span className="brand">SC • EMS</span>
          <h1>Employee Management System</h1>
          <p>Java Spring Boot + React + MySQL</p>
        </div>
        <div className="badge">Full Stack Project</div>
      </header>

      <main>
        <section className="card form-card">
          <h2>{editingId ? 'Update Employee' : 'Add Employee'}</h2>
          <form onSubmit={submit}>
            <input required placeholder="Full name"
              value={form.name}
              onChange={e => setForm({...form, name:e.target.value})} />
            <input required type="email" placeholder="Email"
              value={form.email}
              onChange={e => setForm({...form, email:e.target.value})} />
            <select value={form.department}
              onChange={e => setForm({...form, department:e.target.value})}>
              <option>IT</option><option>HR</option><option>Finance</option>
              <option>Sales</option><option>Marketing</option>
            </select>
            <input required min="0" type="number" placeholder="Salary"
              value={form.salary}
              onChange={e => setForm({...form, salary:e.target.value})} />
            <button type="submit">{editingId ? 'Update' : 'Add Employee'}</button>
            {editingId && <button type="button" className="secondary" onClick={cancelEdit}>Cancel</button>}
          </form>
        </section>

        <section className="toolbar">
          <div>
            <strong>{employees.length}</strong> Employees
          </div>
          <input className="search" placeholder="Search name, email or department..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </section>

        <section className="card table-card">
          {loading ? <p>Loading...</p> : filtered.length === 0 ? <p>No employees found.</p> :
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Salary</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id}>
                    <td>#{e.id}</td>
                    <td><strong>{e.name}</strong></td>
                    <td>{e.email}</td>
                    <td><span className="dept">{e.department}</span></td>
                    <td>₹{Number(e.salary).toLocaleString('en-IN')}</td>
                    <td className="actions">
                      <button onClick={() => edit(e)}>Edit</button>
                      <button className="danger" onClick={() => remove(e.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}
        </section>
      </main>

      <footer>Built as a Java Full Stack portfolio project • Sachin Chalge</footer>
    </div>
  )
}
