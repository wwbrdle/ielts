import React, { useState, useEffect, useRef } from 'react';
import './SpeechRecognition.css';

interface SpeechRecognitionProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onRecordingComplete: (transcript: string) => void;
  onTranscriptUpdate: (transcript: string) => void;
}

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  onRecordingComplete,
  onTranscriptUpdate
}) => {

  const [isSupported, setIsSupported] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Web Speech API 지원 확인
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        // event.results의 모든 결과를 순회하면서 transcript를 구성
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        // 실시간으로 전체 transcript를 부모 컴포넌트로 전달
        onTranscriptUpdate(finalTranscript + interimTranscript);
        
        // 최종 결과가 있을 때만 onRecordingComplete 호출
        if (finalTranscript) {
          onRecordingComplete(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          alert('음성이 감지되지 않았습니다. 다시 시도해주세요.');
        }
      };
    }
  }, [onRecordingComplete, onTranscriptUpdate]);

  const handleStartRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      onStartRecording();
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      onStopRecording();
    }
  };

  if (!isSupported) {
    return (
      <div className="speech-recognition">
        <div className="not-supported">
          <p>⚠️ 이 브라우저에서는 음성 인식이 지원되지 않습니다.</p>
          <p>Chrome, Edge, Safari 등의 최신 브라우저를 사용해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="speech-recognition">
      <div className="recording-controls">
        {!isRecording ? (
          <button
            onClick={handleStartRecording}
            className="start-button"
          >
            🎤 녹음 시작
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className="stop-button"
          >
            ⏹️ 녹음 중지
          </button>
        )}
      </div>
      
      {isRecording && (
        <div className="recording-status">
          <div className="recording-indicator">
            <div className="pulse"></div>
            <span>녹음 중... 말씀해주세요!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechRecognition;
