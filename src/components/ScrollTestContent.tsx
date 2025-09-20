interface ScrollTestContentProps {
  count: number;
  title?: string;
  className?: string;
  itemContent?: string;
}

export const ScrollTestContent = ({
  count,
  title = "스크롤 테스트용 콘텐츠",
  className = "scroll-test-content",
  itemContent = "이것은 테스트 콘텐츠입니다."
}: ScrollTestContentProps) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(
      <div key={i}>
        <h3>섹션 {i + 1}</h3>
        <p>{itemContent}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <h2>{title}</h2>
      {items}
    </div>
  );
};