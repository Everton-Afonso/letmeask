import { useEffect, useState } from "react";

import { database } from "../services/firebase";

type FirebaseQuestion = Record<
  string,
  {
    auth: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswer: boolean;
    isHighlighted: boolean;
  }
>;

type QuestionType = {
  id: string;
  auth: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswer: boolean;
  isHighlighted: boolean;
};

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestion: FirebaseQuestion = databaseRoom.question ?? {};

      const parsedQuestions = Object.entries(firebaseQuestion).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            auth: value.auth,
            isHighlighted: value.isHighlighted,
            isAnswer: value.isAnswer,
          };
        }
      );

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  return { questions, title };
}
