import React, { useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { v4 as uuidv4 } from 'uuid'
import './App.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function App() {
  const [records, setRecords] = useState([])
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    sleep: '',
    sport: '',
    water: '',
    foodType: 'balanced',
    energy: 50,
    mood: 50,
    stress: 50
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newRecord = { ...formData, id: uuidv4() }
    setRecords([...records, newRecord])
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      sleep: '',
      sport: '',
      water: '',
      foodType: 'balanced',
      energy: 50,
      mood: 50,
      stress: 50
    })
  }

  const handleDelete = (id) => {
    setRecords(records.filter(record => record.id !== id))
  }

  const chartData = {
    labels: records.map(record => record.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: records.map(record => record.weight),
        borderColor: '#1db954', // Green
        backgroundColor: '#1db95450'
      },
      {
        label: 'Sleep (hours)',
        data: records.map(record => record.sleep),
        borderColor: '#ff0000', // Red
        backgroundColor: '#ff000050'
      },
      {
        label: 'Energy Level',
        data: records.map(record => record.energy),
        borderColor: '#0000ff', // Blue
        backgroundColor: '#0000ff50'
      },
      {
        label: 'Mood',
        data: records.map(record => record.mood),
        borderColor: '#ffff00', // Yellow
        backgroundColor: '#ffff0050'
      },
      {
        label: 'Sport (minutes)',
        data: records.map(record => record.sport),
        borderColor: '#ee82ee', // Violet
        backgroundColor: '#ee82ee50'
      },
      {
        label: 'Stress Level',
        data: records.map(record => record.stress),
        borderColor: '#ffa500', // Orange
        backgroundColor: '#ffa50050'
      },
      {
        label: 'Water (liters)',
        data: records.map(record => record.water),
        borderColor: '#ffffff', // White
        backgroundColor: '#ffffff50'
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: '#ffffff20'
        }
      },
      y: {
        ticks: {
          color: '#ffffff'
        },
        grid: {
          color: '#ffffff20'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    }
  }

  return (
    <div className="container">
      <h1>Healthy Track</h1>
      <form onSubmit={handleSubmit} className="track-form">
        <div className="form-group">
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Weight (kg):</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} step="0.1" required />
        </div>
        <div className="form-group">
          <label>Sleep (hours):</label>
          <input type="number" name="sleep" value={formData.sleep} onChange={handleInputChange} step="0.1" required />
        </div>
        <div className="form-group">
          <label>Sport (minutes):</label>
          <input type="number" name="sport" value={formData.sport} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Water (liters):</label>
          <input type="number" name="water" value={formData.water} onChange={handleInputChange} step="0.1" />
        </div>
        <div className="form-group">
          <label>Food Type:</label>
          <select name="foodType" value={formData.foodType} onChange={handleInputChange}>
            <option value="balanced">Balanced</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="low-carb">Low Carb</option>
            <option value="high-protein">High Protein</option>
          </select>
        </div>

        <div className="range-inputs">
          <div className="form-group">
            <label>Energy Level (1-100): {formData.energy}</label>
            <input type="range" name="energy" min="1" max="100" value={formData.energy} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Mood (1-100): {formData.mood}</label>
            <input type="range" name="mood" min="1" max="100" value={formData.mood} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Stress Level (1-100): {formData.stress}</label>
            <input type="range" name="stress" min="1" max="100" value={formData.stress} onChange={handleInputChange} />
          </div>
        </div>

        <button type="submit">Add Record</button>
      </form>

      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="records-table">
        <h2>Records</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight</th>
              <th>Sleep</th>
              <th>Energy</th>
              <th>Mood</th>
              <th>Sport</th>
              <th>Stress</th>
              <th>Food</th>
              <th>Water</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                <td>{record.date}</td>
                <td>{record.weight} kg</td>
                <td>{record.sleep} hrs</td>
                <td>{record.energy}</td>
                <td>{record.mood}</td>
                <td>{record.sport} min</td>
                <td>{record.stress}</td>
                <td>{record.foodType}</td>
                <td>{record.water} L</td>
                <td>
                  <button onClick={() => handleDelete(record.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
