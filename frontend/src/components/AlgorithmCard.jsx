import './AlgorithmCard.css'

function AlgorithmCard({ algorithm, onClick }) {
  return (
    <div 
      className="algorithm-card"
      onClick={onClick}
      style={{ '--card-color': algorithm.color }}
    >
      <div className="card-icon">{algorithm.icon}</div>
      <h2 className="card-title">{algorithm.title}</h2>
      <p className="card-description">{algorithm.description}</p>
      <div className="card-footer">
        <span className="card-link">Explorar →</span>
      </div>
    </div>
  )
}

export default AlgorithmCard

