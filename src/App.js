import React, { useState } from 'react';

function App() {
  const [logs, setLogs] = useState([]);
  const [selectedLog, setSelectedLog] = useState(null);
  const [isDetailVisible, setDetailVisible] = useState(false); // 상세 내용 표시 여부

  const addLog = (newLog) => {
    const logEntry = { text: newLog, date: new Date().toISOString() };
    setLogs([...logs, logEntry]);
  };

  const handleLogClick = (log) => {
    setSelectedLog(log);
    setDetailVisible(true); // 상세 내용 보이기
  };

  const handleLogDelete = (logToDelete) => {
    setLogs(logs.filter(log => log !== logToDelete));
    if (selectedLog === logToDelete) {
      setSelectedLog(null); // 삭제된 로그가 선택된 로그라면 선택 해제
      setDetailVisible(false); // 상세 내용 숨기기
    }
  };

  const handleCloseDetail = () => {
    setDetailVisible(false); // 상세 내용 숨기기
    setSelectedLog(null); // 선택 로그 초기화
  };

  return (
    <div>
      <h1>공부 기록</h1>
      <StudyLogForm addLog={addLog} />
      <StudyLogList logs={logs} onLogClick={handleLogClick} selectedLog={selectedLog} />
      {isDetailVisible && (
        <StudyLogDetail log={selectedLog} onLogDelete={handleLogDelete} onClose={handleCloseDetail} />
      )}
    </div>
  );
}

function StudyLogForm({ addLog }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addLog(input);
      setInput('');
    } else {
      alert("공백이 아닌 내용을 입력하세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="공부 내용을 입력하세요"
        rows={4} // 높이 조절
        style={{ width: '100%', resize: 'none' }} // 너비 및 크기 조절 비활성화
      />
      <button type="submit" className="small-button">추가</button>
    </form>
  );
}

function StudyLogList({ logs, onLogClick, selectedLog }) {
  return (
    <ul>
      {logs.map((log, index) => (
        <li
          key={`${log.text}-${index}`}
          onClick={() => onLogClick(log)}
          style={{
            cursor: 'pointer',
            backgroundColor: selectedLog === log ? '#f0f8ff' : 'transparent',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {log.text.split('\n')[0]} {/* 첫 줄만 표시 */}
        </li>
      ))}
    </ul>
  );
}

function StudyLogDetail({ log, onLogDelete, onClose }) {
  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h2>공부 내용</h2>
      <p>{log.text}</p>
      <p>{new Date(log.date).toLocaleString()}</p>
      <button onClick={() => onLogDelete(log)} className="small-button">삭제</button>
      <button onClick={onClose} className="small-button">닫기</button>
    </div>
  );
}

export default App;
