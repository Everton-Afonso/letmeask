import { ReactNode } from "react";

import "../styles/question.scss";

type QuestionProps = {
  content: string;
  auth: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
};
export function Question({ content, auth, children }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={auth.avatar} alt={auth.name} />
          <span>{auth.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
