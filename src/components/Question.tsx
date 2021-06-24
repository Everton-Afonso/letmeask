import "../styles/question.scss";

type QuestionProps = {
  content: string;
  auth: {
    name: string;
    avatar: string;
  };
};
export function Question({ content, auth }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={auth.avatar} alt={auth.name} />
          <span>{auth.name}</span>
        </div>
        <div></div>
      </footer>
    </div>
  );
}
