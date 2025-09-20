import { useState } from 'react';
import { FormModal } from './components/modal/FormModal';
import { ScrollTestContent } from './components/ScrollTestContent';
import type { FormData } from './types/form';
import { useModal } from './contexts/ModalContext';

interface ResultCardProps {
  result: FormData;
}

const ResultCard = ({ result }: ResultCardProps) => (
  <div className="result-card">
    <h2>제출된 정보</h2>
    <div>
      <div className="result-item">
        <span className="result-label">이름:</span>
        <span className="result-value">{result.name}</span>
      </div>
      <div className="result-item">
        <span className="result-label">이메일:</span>
        <span className="result-value">{result.email}</span>
      </div>
      <div className="result-item">
        <span className="result-label">문의 내용:</span>
        <span className="result-value">{result.message}</span>
      </div>
    </div>
  </div>
);

const ModalFormPage = () => {
  const [lastResult, setLastResult] = useState<FormData | null>(null);
  const { openModal } = useModal();

  const handleOpenDeclarativeModal = () => {
    openModal((result) => {
      setLastResult(result);
    });
  };

  return (
    <div>
      <main>
        <div>
          <h1>Radix UI Dialog 모달 폼</h1>
          <div>
            <button
              type="button"
              onClick={handleOpenDeclarativeModal}
            >
              선언적 API 모달 열기
            </button>
          </div>
          {lastResult && <ResultCard result={lastResult} />}

          <ScrollTestContent
            count={50}
            itemContent="스크롤 테스트"
          />
        </div>
      </main>
      <FormModal />
    </div>
  );
};

export default ModalFormPage;