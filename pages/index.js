import { useState, useEffect } from 'react'
    import { Line } from 'react-chartjs-2'
    import { v4 as uuidv4 } from 'uuid'
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
    } from 'chart.js'

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    )

    export default function Home() {
      const [records, setRecords] = useState([])
      const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        weight: '',
        sleepHours: '',
        energyLevel: '3',
        mood: 'neutral',
        sportActivities: '',
        stressLevel: '3',
        waterIntake: '',
        foodType: 'balanced'
      })
      const [editingId, setEditingId] = useState(null)

      useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('healthRecords') || '[]')
        setRecords(storedData)
      }, [])

      const handleSubmit = (e) => {
        e.preventDefault()
        if (editingId) {
          const updatedRecords = records.map(record => 
            record.id === editingId ? { ...formData, id: editingId } : record
          )
          setRecords(updatedRecords)
          localStorage.setItem('healthRecords', JSON.stringify(updatedRecords))
          setEditingId(null)
        } else {
          const newRecord = { id: uuidv4(), ...formData }
          const updatedRecords = [...records, newRecord]
          setRecords(updatedRecords)
          localStorage.setItem('healthRecords', JSON.stringify(updatedRecords))
        }
        setFormData({
          date: new Date().toISOString().split('T')[0],
          weight: '',
          sleepHours: '',
          energyLevel: '3',
          mood: 'neutral',
          sportActivities: '',
          stressLevel: '3',
          waterIntake: '',
          foodType: 'balanced'
        })
      }

      const handleDelete = (id) => {
        const updatedRecords = records.filter(record => record.id !== id)
        setRecords(updatedRecords)
        localStorage.setItem('healthRecords', JSON.stringify(updatedRecords))
      }

      const handleEdit = (record) => {
        setFormData(record)
        setEditingId(record.id)
      }

      const chartData = {
        labels: records.map(record => record.date),
        datasets: [
          {
            label: 'Weight (kg)',
            data: records.map(record => record.weight),
            borderColor: '#1db954',
            backgroundColor: 'rgba(29, 185, 84, 0.2)',
          },
          {
            label: 'Sleep Hours',
            data: records.map(record => record.sleepHours),
            borderColor: '#ff6384',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Energy Level',
            data: records.map(record => record.energyLevel),
            borderColor: '#36a2eb',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            yAxisID: 'y1'
          },
          {
            label: 'Sport Activities (min)',
            data: records.map(record => record.sportActivities),
            borderColor: '#ffcd56',
            backgroundColor: 'rgba(255, 205, 86, 0.2)',
          },
          {
            label: 'Stress Level',
            data: records.map(record => record.stressLevel),
            borderColor: '#9966ff',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            yAxisID: 'y1'
          },
          {
            label: 'Water Intake (L)',
            data: records.map(record => record.waterIntake),
            borderColor: '#4bc0c0',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }
        ]
      }

      return (
        <div className="container">
          <h1>Health Monitor</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Weight (kg):</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Sleep Hours:</label>
              <input
                type="number"
                value={formData.sleepHours}
                onChange={(e) => setFormData({...formData, sleepHours: e.target.value})}
                min="0"
                max="24"
                required
              />
            </div>
            <div className="form-group">
              <label>Energy Level:</label>
              <select
                value={formData.energyLevel}
                onChange={(e) => setFormData({...formData, energyLevel: e.target.value})}
              >
                <option value="1">Very Low</option>
                <option value="2">Low</option>
                <option value="3">Normal</option>
                <option value="4">High</option>
                <option value="5">Very High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Mood:</label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: e.target.value})}
              >
                <option value="very-happy">😄 Very Happy</option>
                <option value="happy">😊 Happy</option>
                <option value="neutral">😐 Neutral</option>
                <option value="sad">😔 Sad</option>
                <option value="very-sad">😢 Very Sad</option>
              </select>
            </div>
            <div className="form-group">
              <label>Sport Activities (minutes):</label>
              <input
                type="number"
                value={formData.sportActivities}
                onChange={(e) => setFormData({...formData, sportActivities: e.target.value})}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Stress Level:</label>
              <select
                value={formData.stressLevel}
                onChange={(e) => setFormData({...formData, stressLevel: e.target.value})}
              >
                <option value="1">Very Low</option>
                <option value="2">Low</option>
                <option value="3">Normal</option>
                <option value="4">High</option>
                <option value="5">Very High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Water Intake (liters):</label>
              <input
                type="number"
                value={formData.waterIntake}
                onChange={(e) => setFormData({...formData, waterIntake: e.target.value})}
                step="0.1"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Food Type:</label>
              <select
                value={formData.foodType}
                onChange={(e) => setFormData({...formData, foodType: e.target.value})}
              >
                <option value="balanced">Balanced</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="low-carb">Low Carb</option>
                <option value="high-protein">High Protein</option>
                <option value="junk-food">Junk Food</option>
              </select>
            </div>
            <button type="submit">
              {editingId ? 'Update Record' : 'Add Record'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setFormData({
                    date: new Date().toISOString().split('T')[0],
                    weight: '',
                    sleepHours: '',
                    energyLevel: '3',
                    mood: 'neutral',
                    sportActivities: '',
                    stressLevel: '3',
                    waterIntake: '',
                    foodType: 'balanced'
                  })
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>

          <div className="chart-container">
            <Line data={chartData} />
          </div>

          <div className="table-container">
            <h2>Health Records</h2>
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
                  <th>Water</th>
                  <th>Food</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map(record => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>{record.weight} kg</td>
                    <td>{record.sleepHours} hrs</td>
                    <td>{['Very Low', 'Low', 'Normal', 'High', 'Very High'][record.energyLevel - 1]}</td>
                    <td>{{
                      'very-happy': '😄',
                      'happy': '😊',
                      'neutral': '😐',
                      'sad': '😔',
                      'very-sad': '😢'
                    }[record.mood]}</td>
                    <td>{record.sportActivities} min</td>
                    <td>{['Very Low', 'Low', 'Normal', 'High', 'Very High'][record.stressLevel - 1]}</td>
                    <td>{record.waterIntake} L</td>
                    <td>{record.foodType}</td>
                    <td>
                      <button onClick={() => handleEdit(record)}>Edit</button>
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
