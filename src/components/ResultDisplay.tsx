import React from 'react';
import './ResultDisplay.css';

interface ResultDisplayProps {
  similarityScore: number;
  userAnswer: string;
  sampleAnswer: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  similarityScore,
  userAnswer,
  sampleAnswer
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28a745';
    if (score >= 60) return '#ffc107';
    if (score >= 40) return '#fd7e14';
    return '#dc3545';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return '🎉 훌륭합니다!';
    if (score >= 60) return '👍 잘했어요!';
    if (score >= 40) return '🤔 노력이 필요해요';
    return '📚 더 연습이 필요해요';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return '모범 답안과 매우 유사합니다. IELTS 고득점을 기대할 수 있어요!';
    if (score >= 60) return '좋은 시도입니다. 더 자세한 설명을 추가하면 더 좋은 점수를 받을 수 있어요.';
    if (score >= 40) return '기본적인 내용은 포함되어 있지만, 더 풍부한 어휘와 표현이 필요합니다.';
    return '모범 답안을 참고하여 더 자세하고 정확한 답변을 연습해보세요.';
  };

  return (
    <div className="result-display">
      <h3>📊 분석 결과</h3>
      
      <div className="score-section">
        <div className="score-circle" style={{ borderColor: getScoreColor(similarityScore) }}>
          <span className="score-number">{similarityScore}%</span>
          <span className="score-label">유사도</span>
        </div>
        
        <div className="score-message">
          <h4 style={{ color: getScoreColor(similarityScore) }}>
            {getScoreMessage(similarityScore)}
          </h4>
          <p>{getScoreDescription(similarityScore)}</p>
        </div>
      </div>

      <div className="comparison-section">
        <div className="comparison-item">
          <h4>🎤 당신의 답변</h4>
          <p>{userAnswer}</p>
        </div>
        
        <div className="comparison-item">
          <h4>📖 모범 답안</h4>
          <p>{sampleAnswer}</p>
        </div>
      </div>

      <div className="tips-section">
        <h4>💡 개선 팁</h4>
        <ul>
          <li>더 구체적인 예시를 들어보세요</li>
          <li>다양한 어휘와 표현을 사용해보세요</li>
          <li>연결어를 활용하여 답변을 더 자연스럽게 만들어보세요</li>
          <li>충분한 설명과 근거를 제공해보세요</li>
        </ul>
      </div>
    </div>
  );
};

export default ResultDisplay;
